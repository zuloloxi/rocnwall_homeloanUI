import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/Models/mortgage-project';
import { Simulation } from 'src/app/Models/simulation';
import { MortgageSimulationService } from 'src/app/services/mortgage-simulation.service';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { MortgageProjectService } from 'src/app/services/mortgage-project.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-simulation-summary',
  templateUrl: './simulation-summary.component.html',
  styleUrls: ['./simulation-summary.component.css']
})
export class SimulationSummaryComponent implements OnInit {

  @Input() projectId: string;

  isDataReceived: boolean;

  // @Input() simulation: Simulation;
  project: Project;
  simulation: Simulation;

  displayError = false;
  displayAlert = false;
  errorMsg: string;
  headerMsg: String;

  constructor(private mortgageSimulationService: MortgageSimulationService,
              private mortgageProjectService: MortgageProjectService,
              private route: ActivatedRoute,
              private router: Router) { }


  ngOnInit() {
    this.isDataReceived = false;
    // Récupération des donnnées dans le repository
    const obsProject: Observable<Project> = this.mortgageProjectService.getMortgageProject(this.projectId);
    obsProject.subscribe(data => {
      this.project = data;
      const obsSimulation: Observable<Simulation[]> = this.mortgageSimulationService.getAllSimulations(this.projectId);
      obsSimulation.subscribe(otherData => {
        const simulations: Simulation[] = otherData;
        if (simulations.length === 0) {
          this.headerMsg = 'Information:'
          this.errorMsg = "Il n'existe pas de simulation sur ce dossier";
          this.displayAlert = true;
        } else {
          // In this release, we only support one simulation for a project.
          this.simulation = simulations[0];
          this.isDataReceived = true;
        }
      },
        (error) => {
          this.headerMsg = 'Service indisponible';
          this.errorMsg = `${error.statusText} (${error.status})`;
          this.displayError = true;
        });
    },
      (error) => {
        this.headerMsg = 'Service indisponible';
        this.errorMsg = `${error.statusText} (${error.status})`;
        this.displayError = true;
      });
  }

  closeAlert() {
    this.router.navigate(['/projects']);
  }
}
