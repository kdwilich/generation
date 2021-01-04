import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DataFrame from 'dataframe-js';

@Injectable({
  providedIn: 'root'
})
export class DamsService {
  timeOfDay: number;
  damData: any;
  genDataFrame: any;
  lakeDir = {
    BBD: ['Broken Bow', 'Oklahoma'],
    DEN: ['Denison', 'Okla-Texas'],
    KEY: ['Keystone', 'Oklahoma'],
    FGD: ['Fort Gibson', 'Oklahoma'],
    WFD: ['Webbers Falls L&D', 'Oklahoma'],
    TKD: ['Tenkiller', 'Oklahoma'],
    EUF: ['Eufaula', 'Oklahoma'],
    RSK: ['Robert S. Kerr L&D', 'Oklahoma'],
    OZK: ['Ozark L&D', 'Arkansas'],
    OZD: ['Ozark L&D', 'Arkansas'],
    DAD: ['Dardanelle L&D', 'Arkansas'],
    BEV: ['Beaver', 'Arkansas'],
    TRD: ['Table Rock', 'Missouri'],
    BSD: ['Bull Shoals', 'Arkansas'],
    NFD: ['Norfork', 'Arkansas'],
    GFD: ['Greers Ferry', 'Arkansas'],
    STD: ['Stockton', 'Missouri'],
    HST: ['Harry S Truman', 'Missouri'],
    CAN: ['Clarence Cannon', 'Missouri']
  };
  sortedLakeDir
  columns: any;
  private corsProxy = 'https://cors-anywhere-kw.herokuapp.com/';

  constructor(private readonly http: HttpClient) {
    this.getGenerationSchedules();
    this.timeOfDay = (new Date).getHours();
    this.sortedLakeDir = this.sortObj(this.lakeDir)
  }

  private getGenerationSchedules() {
    this.http.get(this.corsProxy + 'https://www.swpa.gov/gen/mon.htm', { responseType: 'text' })
      .subscribe((res: any) => {
        this.parseRes(res);
      });
  }

  private CSVToArray = (data, delimiter = ',') => data
    .split(/\r?\n|\r/g)
    .map(v => v.split(delimiter));

  private parseRes(res: string) {
    let preTable = res.substring(res.indexOf('HR '), res.indexOf('TOT '));
    preTable = preTable.replace(/^\s+/gm, '').replace(/[^\S\r\n]+/g, ',');
    const formattedTable = this.CSVToArray(preTable);
    const [columns, data] = [ // return col headers and rest of data except for last null row
      formattedTable.shift(),
      [...formattedTable].slice(0, formattedTable.length - 1)
    ];
    this.columns = columns;
    this.genDataFrame = new DataFrame(data, columns);
    this.damData = JSON.parse(this.genDataFrame.toJSON());
    console.log('dataFrame: ', JSON.parse(this.genDataFrame.toJSON()));
  }

  isGenerating(dam) {
    const genByHour: number = this.damData[dam][this.timeOfDay];
    return genByHour > 0;
  }

  sortObj(obj) {
    return Object.keys(obj).sort().reduce(
      (obj, key) => { 
        obj[key] = this.lakeDir[key]; 
        return obj;
      },{}
    )
  }

}
