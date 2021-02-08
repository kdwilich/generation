import { Component, Input } from '@angular/core';
import { ProjectDetails } from 'src/app/services/generation.interface';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent {
  @Input() projectDetails: ProjectDetails[];
  @Input() weather: number = 31;
  @Input() summary: string = 'Generating from now until further notice.';
  displayedColumns: string[] = [ 'status', 'abbr', 'name', 'state'];

  constructor() {}

}
