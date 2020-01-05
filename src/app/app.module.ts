import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularAccueilComponent } from './angular-accueil/angular-accueil.component';
import { StepMenuComponent } from './step-menu/step-menu.component';

import { MenuModule } from 'primeng/menu';
import { StepsModule } from 'primeng/steps';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectComponent } from './project/project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AngularAccueilComponent,
    StepMenuComponent,
    NavbarComponent,
    ProjectComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenuModule,
    StepsModule
  ],
  providers: [
    { provide: 'BACKEND_URL', useValue: 'http://localhost:8000' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
