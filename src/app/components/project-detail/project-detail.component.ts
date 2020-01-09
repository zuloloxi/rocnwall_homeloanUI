import { Component, OnInit, Input } from '@angular/core';
import { MortgageProjectService } from 'src/app/services/mortgage-project.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/Models/mortgage-project';
import { MortgageSimulationService } from 'src/app/services/mortgage-simulation.service';
import { Simulation } from 'src/app/Models/simulation';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})

export class ProjectDetailComponent implements OnInit {
  project: Project;
  mortgageSimulation: Simulation;
  doesDataExist: boolean;


  constructor(private mortgageSimulationService: MortgageSimulationService,
              private mortgageProjectService: MortgageProjectService,
              private route: ActivatedRoute) { };

  ngOnInit() {
    this.doesDataExist = false;

    const projectId = this.route.snapshot.paramMap.get('id');
    console.log(projectId);

    // Récupération des donnnées dans le repository
    const obsProject: Observable<Project> = this.mortgageProjectService.getMortgageProject(projectId);
    obsProject.subscribe(data => {
      this.project = data;
      const obsSimulation: Observable<Simulation> = this.mortgageSimulationService.getSimulation(projectId);
      obsSimulation.subscribe(data => {
        this.mortgageSimulation = data;
        this.doesDataExist = true;
      });
    });

  }
}
