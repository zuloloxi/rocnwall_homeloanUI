import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/Models/mortgage-project';
import { Simulation } from 'src/app/Models/simulation';

@Component({
  selector: 'app-simulation-summary',
  templateUrl: './simulation-summary.component.html',
  styleUrls: ['./simulation-summary.component.css']
})
export class SimulationSummaryComponent implements OnInit {

  @Input() project: Project;
  @Input() simulation: Simulation;

  constructor() { }

  ngOnInit() {
    console.log(this.simulation);
  }

}
