import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DamsService } from '../dams.service';

@Component({
  selector: 'app-dam-detail',
  templateUrl: './dam-detail.component.html',
  styleUrls: ['./dam-detail.component.css']
})
export class DamDetailComponent implements OnInit {
  selectedDam: any;
  get genData() {
    return this.damsService.damData;
  }
  get timeOfDay(): number {
    return this.damsService.timeOfDay;
  }

  constructor(private router: ActivatedRoute, private damsService: DamsService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const dam = params.get('abbr');
      if (dam) { this.selectedDam = dam; }
    })}

}
