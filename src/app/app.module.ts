import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularAccueilComponent } from './components/angular-accueil/angular-accueil.component';
import { StepMenuComponent } from './components/step-menu/step-menu.component';

import { MenuModule } from 'primeng/menu';
import { StepsModule } from 'primeng/steps';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectComponent } from './components/project/project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmprunteurFormComponent } from './components/emprunteur-form/emprunteur-form.component';


@NgModule({
  declarations: [
    AppComponent,
    AngularAccueilComponent,
    StepMenuComponent,
    NavbarComponent,
    ProjectComponent,
    EmprunteurFormComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenuModule,
    StepsModule,
    HttpClientModule
  ],
  providers: [
    { provide: 'BACKEND_URL', useValue: 'http://localhost:8000' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
