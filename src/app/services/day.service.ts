import { Injectable } from '@angular/core';
import { WeekDay } from './day.interface';
import { GenerationService } from './generation.service';

@Injectable({
  providedIn: 'root'
})
export class DayService {
  private day: WeekDay
  public weekDays: any[];

  constructor(private readonly genService: GenerationService) {
    this.weekDays = [
      { label: 'Sunday', value: 'sun' },
      { label: 'Monday', value: 'mon' },
      { label: 'Tuesday', value: 'tue' },
      { label: 'Wednesday', value: 'wed' },
      { label: 'Thursday', value: 'thu' },
      { label: 'Friday', value: 'fri' },
      { label: 'Saturday', value: 'sat' }
    ];
    this.selectedDay = this.getToday();
  }

  get selectedDay(): WeekDay {
    return this.day;
  }

  set selectedDay(day: WeekDay) {
    this.day = day;
    this.genService.getSchedule(day);
  }

  private getToday = (): WeekDay => (new Date).toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase() as WeekDay;

}

