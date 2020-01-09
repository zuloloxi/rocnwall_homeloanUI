import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StepMenuComponent } from './components/step-menu/step-menu.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';


const routes: Routes = [
  { path: 'simulation/new', component: StepMenuComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/:id', component: ProjectDetailComponent},
  { path: '', redirectTo: 'simulation/new', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
