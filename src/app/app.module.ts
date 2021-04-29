import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { DamsModule } from './dams/dams.module';
import { ProjectListModule } from './site-list/project-list.module';
import { ButtonGroupComponent } from './shared/button-group/button-group.component';
import { TooltipDirective } from './shared/tooltip/tooltip.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonGroupComponent,
    TooltipDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    DamsModule,
    ProjectListModule,
    MatToolbarModule
  ],
  providers: [],
  exports: [TooltipDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
