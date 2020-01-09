import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core'
import { MenuItem } from 'primeng/api';
import { Project } from 'src/app/Models/mortgage-project';
import { Simulation } from 'src/app/Models/simulation';

@Component({
  selector: 'app-step-menu',
  templateUrl: './step-menu.component.html',
  styleUrls: ['./step-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StepMenuComponent implements OnInit {
  items: MenuItem[];
  activeIndex: number;
  currentProject: Project;
  currentSimulation: Simulation;
  isSavedProject: boolean;

  constructor() { }

  ngOnInit() {
    this.activeIndex = 0;
    this.isSavedProject = false;

    this.items = [{
      label: 'Projet',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    },
    {
      label: 'Emprunteurs',
      command: (event: any) => {
        this.activeIndex = 1;
      }
    },
    {
      label: 'Simulation',
      command: (event: any) => {
        this.activeIndex = 2;
      }
    },
    {
      label: 'Synthèse',
      command: (event: any) => {
        this.activeIndex = 3;
      }
    }
    ];
  }

  incrementProjectStep(project: Project) {
    this.currentProject = project;
    this.isSavedProject = true;
    this.activeIndex ++;
  }

  decrementProjectStep(project: Project) {
    this.currentProject = project;
    this.activeIndex--;
  }

  incrementSimulationStep(simulation: Simulation) {
    this.currentSimulation = simulation;
    console.log(this.currentSimulation);
    this.activeIndex ++;
  }

  decrementSimulationStep(simulation: Simulation) {
    this.currentSimulation = simulation;
    this.activeIndex--;
  }

}
