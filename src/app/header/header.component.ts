import { Component, OnInit } from '@angular/core';
import { DayService } from '../services/day.service';
import { GenerationService } from '../services/generation.service';
import { WeekDay } from '../services/day.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  weekDays: any[];
  selectedDay: WeekDay;

  constructor(public readonly dayService: DayService) { }

  ngOnInit(): void {
    this.weekDays = this.dayService.weekDays;
  }

  changeDay(day: WeekDay) {
    if (this.dayService.selectedDay !== day) {
      this.dayService.selectedDay = day;
    }
  }
}
