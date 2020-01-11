import { Component, OnInit } from '@angular/core';
import { MortgageProjectService } from 'src/app/services/mortgage-project.service';
import { Project } from 'src/app/Models/mortgage-project';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[];
  cols: any[];
  selectedProject: Project;

  projectTypes: SelectItem[];

  displayError = false;
  errorMsg: string;

  constructor(private mortgageProjectService: MortgageProjectService, private projectListRouter: Router) { }

  ngOnInit() {
    this.cols = [
      { field: 'referenceId', header: 'Référence' },
      { field: 'projectType', header: 'Type de projet' },
      { field: 'householdCharges', header: 'Charges globales' },
      { field: 'maxLoanPayment', header: 'Echéance globale max conseillée' }
    ];

    this.projectTypes = [
      { label: 'Tous', value: null },
      { label: 'Achat', value: 'PURCHASE' },
      { label: 'Construction', value: 'CONSTRUCTION' },
    ];

    const obsProjectList: Observable<Project[]> = this.mortgageProjectService.getAllMortgageProjects();
    obsProjectList.subscribe(data => {
      this.projects = data;
    },
      (error) => {
        this.errorMsg = `${error.statusText} (${error.status})`;
        console.log('Une erreur est arrivée:' + this.errorMsg);
        this.displayError = true;
      });
  }

  viewSimulation(project: Project) {
    this.projectListRouter.navigate(['/projects', project.id, 'view']);
  }

  changeSimulation(project: Project) {
    console.log(project.referenceId);
    this.projectListRouter.navigate(['/projects/', project.id, 'edit']);
  }
}
