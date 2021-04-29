import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectDetails, LoadingState } from './generation.interface';
import { catchError, retry } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerationService {
  private corsProxy = 'https://cors-anywhere-kw.herokuapp.com/';
  private swepcoGenUrl = 'https://www.swpa.gov/gen/';
  private swepcoEndpoint;
  public loadingState: LoadingState; // 0: loaded, 1: loading, 2: failed to load
  public schedule;

  constructor(private readonly http: HttpClient) { }

  get swepcoSource(): string {
    return this.swepcoEndpoint;
  }

  set swepcoSource(day: string) {
    this.swepcoEndpoint = this.swepcoGenUrl + day + '.htm';
  }

  private handleTables(html) {
    if(html) {
      const date = this.findDate(html);

      const rawGenSchedules = this.findTable(html, ['HR ', 'TOT ']);
      const genSchedules = this.createGenScheduleObj(rawGenSchedules);

      const rawProjectDetails = this.findTable(html, ['No. ', 'The project table ']).slice(1);
      const projectDetails = this.createProjectDetailsObj(rawProjectDetails, genSchedules);

      return { date, projectDetails }
    }
    return undefined;
  }

  private scheduleRequest(day) {
    this.loadingState = 'loading';
    this.swepcoSource = day;
    return this.http.get(this.corsProxy + this.swepcoSource, { responseType: 'text' })
      .pipe(retry(3), catchError((err) => {
        console.log('Error loading content:', err);
        return EMPTY;
      }));
  }

  private handleLoadingState = (data) => data ? this.loadingState = 'loaded' : this.loadingState = 'failed';

  public async getSchedule(day) {
    this.schedule = await this.scheduleRequest(day).toPromise()
      .then(html => this.handleTables(html))
      .then(data => {
        this.handleLoadingState(data);
        return data;
      })
      .catch(err => console.log(err));

    console.log(this.schedule);
  }

  /**
   * Extract a CSV table from an HTML string starting with 'HR' ending with 'TOT '
   * @param htmlStr HTML as text
   */
  private findTable(str: string, [start, end]): string[][] {
    return str
      .substring(str.indexOf(start), str.indexOf(end))
      .replace(/^\s+/gm, '')          // rm whitespace before chars on each line
      .replace(/[^\S\r\n]{2,}/g, '|') // replace whitespace > 2 (except eol) between chars with '.'
      .split(/\r?\n|\r/g)             // split into rows
      .slice(0, -1)                   // remove empty array at end, created from very last eol char
      .map(row => row.split('|'))     // split rows into columns
  }

  private findDate(str) {
    const capitalize = (s) => {
      if (typeof s !== 'string') { return '' };
      s = s.toLowerCase();
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
    const matchDate = /((?:sun|mon|tue|wed|thu|fri|sat)+\w+)\s*(\w+)\s*(0[1-9]|[12][0-9]|3[01]),\s*((?:19|20)\d\d)/i;
    const date = matchDate.exec(str).slice(1);
    const [weekDay, month, day, year] = date.map(str => capitalize(str));
    const fullDate = `${weekDay} ${month}, ${day} ${year}`;

    return { fullDate, weekDay, month, day, year };
  }

  private getSites(html: string) {
    const siteAbbrs = /(?<=^\s*HR.*)[A-Z]{3}.*?/gm;
    const sites: string[] = [];
    let match;
    while (match = siteAbbrs.exec(html)) {
      sites.push(match[0])
    }
    return sites;
  }

  public isGenerating(genSchedule): boolean {
    const currentHour = (new Date()).getHours();
    return genSchedule[currentHour] > 0;
  }

  private arrayRange(arr: any[]) {
    if (arr.length > 1) {
      return [arr[0], arr[arr.length - 1] + 1];
    } else {
      return arr;
    }
  }

  private convertTo12Hr(hour: number) {
    const suffix = hour >= 12 ? 'pm' : 'am';
    return ((hour + 11) % 12 + 1) + suffix;;
  }

  private setGenerationSummary(genSchedule) {
    const genHrs: number[] = []
    let summary = '';
    genSchedule.forEach((hr, i) => {
      if (parseInt(hr) > 0) {
        genHrs.push(i + 1);
      }
    });
    if (genHrs.length === 24) {
      summary = 'Generating all day'
    } else if (genHrs.length > 0) {
      let timeRange = [];
      let temp = [];
      // group sequential numbers in an array
      //  ex: [1,2,5,6,7] => [[1,2],[5,6,7]]
      genHrs.forEach((hr, i) => {
        if (i === 0) {
          temp.push(hr);
          return;
        }
        if (genHrs[i - 1] != genHrs[i] - 1) {
          timeRange.push(this.arrayRange(temp));
          temp = [];
        }
        temp.push(hr);
      })
      timeRange.push(this.arrayRange(temp));
      // convert 2d timeRange number array to 12hr time, ex: [[15,12],[3]] => [[3pm, 12pm],[3am]]
      timeRange = timeRange.map(r => r.map(k => this.convertTo12Hr(k)));
      // set rangeStr like the following ex:
      //  [[3am,5am]] => 3-5am
      //  [[3am,5am],[10am,3pm]] => 3-5am and 10am-3pm
      //  [[3am,5am],[10am,3pm],[7pm,11pm]] => 3-5am, 10am-3pm, and 7-11pm
      let rangeStr = '';
      if (timeRange.length === 1) {
        const [[start, end]] = timeRange;
        rangeStr = start + (end ? '-' + end : '');
      } else if (timeRange.length === 2) {
        const [[start1, end1], [start2, end2]] = timeRange;
        rangeStr = start1 + '-' + end1 + ' and ' + start2 + (end2 ? '-' + end2 : '');
      } else {
        timeRange.forEach(([start, end], i) => {
          if (i !== timeRange.length - 1)
            rangeStr = rangeStr + start + '-' + end + ', '
          else
            rangeStr = rangeStr + 'and ' + start + (end ? '-' + end : '')
        })
      }

      summary = 'Generating from ' + rangeStr.replace(/(am|pm)(-\d+(?:\1))/g, '$2');
    } else {
      summary = 'Not generating';
    }
    return summary;
  }

  private createProjectDetailsObj(rawProjectDetails, genSchedules): ProjectDetails[] {
    return rawProjectDetails.map(project => {
      const [lakeNum, abbr, name, state, numUnits, plantCapacity, fullPowerDischarge] = project;
      const genSchedule = genSchedules[abbr];
      const summary = this.setGenerationSummary(genSchedule);
      return {
        lakeNum,
        genSchedule,
        summary,
        abbr,
        name,
        state,
        numUnits,
        plantCapacity,
        fullPowerDischarge
      };
    })
  }

  private createGenScheduleObj(rawGenSchedule) {
    const projects = rawGenSchedule.shift();
    let genScheduleObj = {};
    projects.map((project: string, colIndex: number) => {
      if (project !== 'HR') {
        if (project === 'OZK') {
          genScheduleObj['OZD'] = rawGenSchedule.map(row => parseInt(row[colIndex]))
        } else {
          genScheduleObj[project] = rawGenSchedule.map(row => parseInt(row[colIndex]))
        }
      }
    })
    return genScheduleObj;
  }


}
