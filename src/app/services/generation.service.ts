import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeekDay, ProjectDetails } from './generation.interface';
import { catchError, retry } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerationService {
  private corsProxy = 'https://cors-anywhere-kw.herokuapp.com/';
  private swepcoGenUrl = 'https://www.swpa.gov/gen/';
  public isLoading: boolean | 'failed';

  constructor(private readonly http: HttpClient) {}

  public async getGenSchedule(day: WeekDay) {
    this.isLoading = true;
    return await this.http
      .get(this.corsProxy + this.swepcoGenUrl + day + '.htm', { responseType: 'text' })
      .pipe(
        retry(3),
        catchError((err) => {
          console.log('Error loading content:', err);
          return EMPTY
        })
      )
      .toPromise()
      .then(htmlStr => {
        if(htmlStr) {
          const date = this.findDate(htmlStr);
  
          const rawGenSchedules = this.findTable(htmlStr, ['HR ', 'TOT ']);
          const genSchedules = this.createGenScheduleObj(rawGenSchedules);
  
          const rawProjectDetails = this.findTable(htmlStr, ['No. ', 'The project table ']).slice(1);
          const projectDetails = this.createProjectDetailsObj(rawProjectDetails, genSchedules);
          
          return { date, projectDetails }
        } else {
          return undefined;
        }
      })
      .then(data => {
        if(data) {
          this.isLoading = false;
        } else {
          this.isLoading = 'failed';
        }
        return data;
      })
      .catch(err => console.log(err));
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

  setStatus(genSchedule) {
    return 
  }

  private createProjectDetailsObj(rawProjectDetails, genSchedules): ProjectDetails[] {
    return rawProjectDetails.map(project => {
      const [lakeNum, abbr, name, state, numUnits, plantCapacity, fullPowerDischarge] = project;
      const genSchedule = genSchedules[abbr];
      return {
        lakeNum,
        genSchedule,
        isGenerating: this.isGenerating(genSchedule),
        status: this.setStatus(genSchedule),
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
          genScheduleObj['OZD'] = rawGenSchedule.map(row => row[colIndex])
        } else {
          genScheduleObj[project] = rawGenSchedule.map(row => row[colIndex])
        }
      }
    })
    return genScheduleObj;
  }


}
