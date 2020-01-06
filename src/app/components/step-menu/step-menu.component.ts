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

  constructor() { }

  ngOnInit() {
    this.activeIndex = 0;
    this.items = [{
      label: 'Projet',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    },
    {
      label: 'Emprunteur',
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

  incrementStep(project: Project) {
    console.log('Event reçu');
    this.currentProject = project;
    console.log(this.currentProject);
    this.activeIndex ++;
  }

  loadSimulation(simulation: Simulation) {
    this.currentSimulation = simulation;
    console.log(this.currentSimulation);
    this.activeIndex ++;
  }
}
