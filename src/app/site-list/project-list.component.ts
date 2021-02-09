import { Component, OnInit } from '@angular/core';
import { GenerationService } from '../services/generation.service';
import { WeekDay, SelectItem } from '../services/generation.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  isTableView: boolean = true;
  genSchedule
  selectedDay: WeekDay;
  date
  weekDays: SelectItem[] = [
    { label: 'Sunday', value: 'sun' },
    { label: 'Monday', value: 'mon' },
    { label: 'Tuesday', value: 'tue' },
    { label: 'Wednesday', value: 'wed' },
    { label: 'Thursday', value: 'thu' },
    { label: 'Friday', value: 'fri' },
    { label: 'Saturday', value: 'sat' }
  ]
  
  get isLoading(): boolean | 'failed' {
    return this.genService.isLoading;
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
    this.route.queryParams.subscribe(queryParam => {
      if (queryParam.day) {
        this.selectedDay = queryParam.day;
        this.setSchedule();
      } else {
        this.selectedDay = (new Date).toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase() as WeekDay;
        this.router.navigate([], {
          relativeTo: this.route, 
          queryParams: { day: this.selectedDay },
          replaceUrl: true,
        });
      }
    })
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
