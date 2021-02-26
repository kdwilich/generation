export type WeekDay = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'today';

export type LoadingState = 'loaded' | 'loading' | 'failed';

export interface SelectItem {
  label: string;
  value: string;
}

export interface ProjectDetails {
  lakeNum: string;
  abbr: string;
  name: string;
  state: string;
  numUnits: string;
  plantCapacity: string;
  fullPowerDischarge: string;
  genSchedule?: string[]
  weather: number;
  summary?: string;
}
