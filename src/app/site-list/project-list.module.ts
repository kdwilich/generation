import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list.component';
import { GridViewComponent } from './grid-view/grid-view.component';
import { TableViewComponent } from './table-view/table-view.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProjectListComponent,
    GridViewComponent,
    TableViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ProjectListComponent
  ]
})
export class ProjectListModule { }
