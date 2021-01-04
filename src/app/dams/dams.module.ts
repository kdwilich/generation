import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DamDetailComponent } from './dam-detail/dam-detail.component';
import { DamsRoutingModule } from './dams-routing.module';
import { DamsService } from './dams.service';
import { GenerationDetailComponent } from './generation-detail/generation-detail.component';
import { DamListComponent } from './dam-list/dam-list.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    GenerationDetailComponent,
    DamDetailComponent,
    DamListComponent
  ],
  imports: [
    CommonModule,
    DamsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule
  ],
  exports: [
    DamListComponent
  ],
  providers: [
    DamsService
  ]
})
export class DamsModule { }
