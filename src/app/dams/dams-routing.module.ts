import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DamDetailComponent } from './dam-detail/dam-detail.component';
import { DamListComponent } from './dam-list/dam-list.component';
import { GenerationDetailComponent } from './generation-detail/generation-detail.component';


const damsRoutes: Routes = [
  { path: 'dams', component: DamListComponent },
  { path: 'dams/:abbr', component: DamDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(damsRoutes)],
  exports: [RouterModule]
})
  
export class DamsRoutingModule { }
