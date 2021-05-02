import { Component, OnInit } from '@angular/core';
import { GenerationService } from '../services/generation.service';
import { LoadingState, SelectItem } from '../services/generation.interface';
import { DayService } from '../services/day.service';
import { WeekDay } from '../services/day.interface';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  isTableView: boolean = true;
  weekDays: any[];
  selectedDay: WeekDay;
  swepcoSource: string;
  displayCols: SelectItem[];

  constructor(
    public readonly genService: GenerationService,
    public readonly dayService: DayService
  ) {
    this.displayCols = [
      { label: 'Abbr', value: 'abbr' },
      { label: 'Name', value: 'name' },
      { label: 'State', value: 'state' },
      // { label: 'Summary', value: 'summary' },
      { label: 'Schedule', value: 'genSchedule' }
    ];
  }

  get loadingState(): LoadingState { return this.genService.loadingState; }

  get schedule() { return this.genService.schedule }

  ngOnInit(): void {
    this.weekDays = this.dayService.weekDays;
  }

  changeDay(day: WeekDay) {
    if (this.dayService.selectedDay !== day) {
      this.dayService.selectedDay = day;
    }
  }

  reloadWindow(): void {
    window.location.reload();
  }
}
