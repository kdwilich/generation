import { Component, Input } from '@angular/core';
import { ProjectDetails, SelectItem } from 'src/app/services/generation.interface';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent {
  @Input() projectDetails: ProjectDetails[];
  @Input() weather: number = 31;
  @Input() summary: string = 'Generating from now until further notice.';
  @Input() columns: SelectItem[];
  faInfoCircle = faInfoCircle;

  constructor() { }

  makeRelative(arr: number[]): number[] {
    const maxValue = Math.max(...arr);
    const maxHeight = 40;
    return arr.map((num: number) => Math.round(num / maxValue * maxHeight));
  }
}
