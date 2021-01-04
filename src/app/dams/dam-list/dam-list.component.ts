import { Component, OnInit } from '@angular/core';
import { DamsService } from '../dams.service'

@Component({
  selector: 'app-dam-list',
  templateUrl: './dam-list.component.html',
  styleUrls: ['./dam-list.component.css']
})
export class DamListComponent implements OnInit {

  get damsAbbr() {
    return this.damsService.columns?.sort();
  }

  get damList() {
    return this.damsService.lakeDir;
  }

  constructor(private damsService: DamsService) { }

  ngOnInit() { }

}
