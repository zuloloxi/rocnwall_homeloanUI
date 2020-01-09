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
  projectId: string;
  mortgageSimulation: Simulation;

  constructor(private mortgageSimulationService: MortgageSimulationService,
              private mortgageProjectService: MortgageProjectService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    console.log(this.projectId);
    const obsSimulation: Observable<Simulation> = this.mortgageSimulationService.getSimulation(this.projectId);
    obsSimulation.subscribe(data => {
      this.mortgageSimulation = data;
      console.log(this.mortgageSimulation);
    });
  }

}
