import { Component, OnInit } from '@angular/core';
import { GenerationService } from '../services/generation.service';
import { LoadingState, SelectItem } from '../services/generation.interface';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent {
  isTableView: boolean = true;
  swepcoSource: string;
  displayCols: SelectItem[];

  constructor(public genService: GenerationService) {
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

  reloadWindow(): void {
    window.location.reload();
  }
}
