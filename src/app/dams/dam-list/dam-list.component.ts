import { Component, OnInit } from '@angular/core';
import { DamsService } from '../dams.service'

// TODO: Optimize loading, add all to object to ref instead of reloading every view change

type View = 'table' | 'grid';

@Component({
  selector: 'app-dam-list',
  templateUrl: './dam-list.component.html',
  styleUrls: ['./dam-list.component.css']
})
export class DamListComponent implements OnInit {
  view: View;
  displayedColumns: string[];
  dataSource: any[]
  get damData() { return this.damsService.damData; }
  get damsAbbr() { return this.damsService.columns?.sort(); }
  get damList() { return this.damsService.lakeDir; }

  constructor(private damsService: DamsService) { }

  ngOnInit() {
    const localView = localStorage.getItem('view') as View;
    if (!localView) {
      const defaultView = 'table';
      localStorage.setItem('view', defaultView);
      this.view = defaultView;
    } else {
      this.view = localView;
    }

    this.displayedColumns = ['site', 'state', 'status', 'details'];
    this.dataSource = [
      {site: 1, state: 'Hydrogen', status: 1.0079, details: 'H'},
      {site: 2, state: 'Helium', status: 4.0026, details: 'He'},
      {site: 3, state: 'Lithium', status: 6.941, details: 'Li'},
      {site: 4, state: 'Beryllium', status: 9.0122, details: 'Be'},
      {site: 5, state: 'Boron', status: 10.811, details: 'B'},
      {site: 6, state: 'Carbon', status: 12.0107, details: 'C'},
      {site: 7, state: 'Nitrogen', status: 14.0067, details: 'N'},
      {site: 8, state: 'Oxygen', status: 15.9994, details: 'O'},
      {site: 9, state: 'Fluorine', status: 18.9984, details: 'F'},
      {site: 10, state: 'Neon', status: 20.1797, details: 'Ne'},
    ];
  }

  changeView(view) {
    localStorage.setItem('view', view);
    this.view = view;
  }

  isGenerating(dam) {
    return this.damsService.isGenerating(dam);
  }

}
