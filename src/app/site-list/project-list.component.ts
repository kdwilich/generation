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
  selectedDay: WeekDay;
  weekDays: SelectItem[];

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
    const currentDay = (new Date).toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
    const currentDayValue = 'today';
    this.weekDays = [
      { label: 'Sunday', value: 'sun' },
      { label: 'Monday', value: 'mon' },
      { label: 'Tuesday', value: 'tue' },
      { label: 'Wednesday', value: 'wed' },
      { label: 'Thursday', value: 'thu' },
      { label: 'Friday', value: 'fri' },
      { label: 'Saturday', value: 'sat' }
    ].map(day => {return {...day, value: (day.value === currentDay ? /*currentDayValue*/day.value : day.value) }});

    console.log(this.weekDays);

    this.route.queryParams.subscribe(({day}) => {
      let weekDayMatch: SelectItem[] = [];

      if (day && day.length >= 3) {
        weekDayMatch = this.weekDays.filter(({value}) => day.indexOf(value) > -1);
      }

      this.selectedDay = (weekDayMatch[0]?.value || currentDay) as WeekDay;

      this.selectedDay === day
        ? this.setSchedule()
        : this.setDayQueryParam(this.selectedDay);
    })
  }

  setDayQueryParam(day) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { day },
      replaceUrl: true,
    });
  }

  async setSchedule() {
    this.genSchedule = await this.genService.getGenSchedule(this.selectedDay);
    console.log(this.genSchedule);
    this.date = this.genSchedule?.date;
  }

  reloadWindow(): void {
    window.location.reload();
  }
}
