import { Component, OnInit, Input } from '@angular/core';
import { DamsService } from '../dams.service';

@Component({
  selector: 'app-generation-details',
  templateUrl: './generation-detail.component.html',
  styleUrls: ['./generation-detail.component.css']
})
export class GenerationDetailComponent implements OnInit {
  @Input() selectedDam: string;
  @Input() dam;

  get damData() {
    return this.damsService.damData;
  }

  get isGenerating() {
    return this.damsService.isGenerating(this.selectedDam);
  }

  constructor( private damsService: DamsService ) { }

  ngOnInit(): void { }

}
