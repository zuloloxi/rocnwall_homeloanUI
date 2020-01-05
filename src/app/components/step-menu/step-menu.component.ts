import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core'
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-step-menu',
  templateUrl: './step-menu.component.html',
  styleUrls: ['./step-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StepMenuComponent implements OnInit {
  items: MenuItem[];
  activeIndex: number = 0;

  constructor() { }

  ngOnInit() {
    this.items = [{
      label: 'Projet',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    },
    {
      label: 'Emprunteur',
      disabled: true,
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

}
