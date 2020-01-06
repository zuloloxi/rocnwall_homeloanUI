import { Component, OnInit, Input } from '@angular/core';
import { Simulation } from 'src/app/Models/simulation';

@Component({
  selector: 'app-simulation-summary',
  templateUrl: './simulation-summary.component.html',
  styleUrls: ['./simulation-summary.component.css']
})
export class SimulationSummaryComponent implements OnInit {

  @Input() simulation: Simulation;
  essai: number;

  constructor() { }

  ngOnInit() {
    console.log(this.simulation);
  }

}
