import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StepMenuComponent } from './components/step-menu/step-menu.component';


const routes: Routes = [
  { path: 'simulation/new', component: StepMenuComponent },
  { path: '', redirectTo: 'simulation/new', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
