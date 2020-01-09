import { Component, OnInit } from '@angular/core';
import { MortgageProjectService } from 'src/app/services/mortgage-project.service';
import { Project } from 'src/app/Models/mortgage-project';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[];
  cols: any[];
  selectedProject: Project;


  constructor(private mortgageProjectService: MortgageProjectService, private projectListRouter: Router) { }

  ngOnInit() {
    this.cols = [
      { field: 'referenceId', header: 'Référence' },
      { field: 'projectType', header: 'Type de projet' },
      { field: 'householdCharges', header: 'Charges globales' },
      { field: 'maxLoanPayment', header: 'Echéance globale max conseillée' }
    ];

    const obsProjectList: Observable<Project[]> = this.mortgageProjectService.getAllMortgageProjects();
    obsProjectList.subscribe(data => {
      this.projects = data;
      // console.log(this.projects);
    });
  }

  viewSimulation(project: Project) {
    // console.log(project.referenceId);
    this.projectListRouter.navigate(['/projects/', project.id]);
  }

  changeSimulation(project: Project) {
    console.log(project.referenceId);
  }
}
