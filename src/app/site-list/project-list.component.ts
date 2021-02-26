import { Component, OnInit } from '@angular/core';
import { GenerationService } from '../services/generation.service';
import { WeekDay, SelectItem, LoadingState } from '../services/generation.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { query } from '@angular/animations';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  isTableView: boolean = true;
  genSchedule
  date
  today: { weekDay: string; value: WeekDay };
  selectedDay: WeekDay;
  weekDays: any[];

  get loadingState(): LoadingState {
    return this.genService.loadingState;
  }
  get swepcoSite(): string {
    return this.genService.swepcoSource;
  }

  constructor(
    private genService: GenerationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.today = {
      weekDay: (new Date).toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase(),
      value: 'today'
    }
    this.weekDays = [
      { label: 'Sunday', value: 'sun' },
      { label: 'Monday', value: 'mon' },
      { label: 'Tuesday', value: 'tue' },
      { label: 'Wednesday', value: 'wed' },
      { label: 'Thursday', value: 'thu' },
      { label: 'Friday', value: 'fri' },
      { label: 'Saturday', value: 'sat' }
    ].map(day => day.value === this.today.weekDay ? { ...day, currentDay: true} : day );

    console.log(this.weekDays);

    this.route.queryParams.subscribe(({day}) => {
      let genDay: string;

      if ( !day ) { // if day is undefined route to current day and return
        this.navigateTo(this.today.weekDay);
        return;
      } else {
        const weekDayMatch = this.weekDays.filter(({value}) => day.indexOf(value) > -1)[0];
        if (weekDayMatch) {
          if (day === weekDayMatch.value) {
            // if day and value are the same load schedule data
            genDay = weekDayMatch.value;
            this.selectedDay = weekDayMatch.value;
          } else {
            // else navigate to the closest matched day and return
            this.navigateTo(weekDayMatch.value);
            return;
          }
        } else if (day === this.today.value) {
          // if day is today load schedule data
          this.selectedDay = this.today.value;
          genDay = this.today.weekDay;
        } else {
          // else the query parameter doesn't match any known values, route to current day and return
          this.navigateTo(this.today.weekDay);
          return;
        }
      }

      this.loadGenSchedule(genDay);
    })
  }

  navigateTo(day) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { day },
      replaceUrl: true,
    });
  }

  async loadGenSchedule(day) {
    this.genSchedule = await this.genService.getGenSchedule(day);
    console.log(this.genSchedule);
    this.date = this.genSchedule?.date;
  }

  reloadWindow(): void {
    window.location.reload();
  }
}
