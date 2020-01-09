import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StepMenuComponent } from './components/step-menu/step-menu.component';

import { MenuModule } from 'primeng/menu';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';


import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BorrowerFormComponent } from './components/borrower-form/borrower-form.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { SimulationFormComponent } from './components/simulation-form/simulation-form.component';
import { SimulationSummaryComponent } from './components/simulation-summary/simulation-summary.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    StepMenuComponent,
    NavbarComponent,
    BorrowerFormComponent,
    ProjectFormComponent,
    SimulationFormComponent,
    SimulationSummaryComponent,
    ProjectListComponent,
    ProjectDetailComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenuModule,
    StepsModule,
    TableModule,
    HttpClientModule
  ],
  providers: [
    { provide: 'BACKEND_URL', useValue: 'http://localhost:8080' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
