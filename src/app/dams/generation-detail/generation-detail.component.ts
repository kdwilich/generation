import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generation-details',
  templateUrl: './generation-detail.component.html',
  styleUrls: ['./generation-detail.component.css']
})
export class GenerationDetailComponent {
  @Input() siteName: string;
  @Input() siteNameAbbr: string;
  @Input() siteState: string;
  @Input() isGenerating: boolean;
}
