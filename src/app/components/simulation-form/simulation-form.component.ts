import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MortgageProjectService } from 'src/app/services/mortgage-project.service';
import { Simulation } from 'src/app/Models/simulation';

@Component({
  selector: 'app-simulation-form',
  templateUrl: './simulation-form.component.html',
  styleUrls: ['./simulation-form.component.css']
})
export class SimulationFormComponent implements OnInit {

  simulationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private projectService: MortgageProjectService) { }

  ngOnInit() {
    this.simulationForm = this.fb.group({
      simulationDate: ['', Validators.required],
      personalDeposit: [''],
      loanAmount: [''],
      loanPayment: [''],
      loanInterestRate: [''],
      loanInsuranceRate: ['', Validators.required],
      loanGuarantyRate: ['', Validators.required],
      loanDuration: ['', Validators.required],
      periodicity: ['', Validators.required]
    });
  }

  saveSimulation() {
    // Transforme les données du formulaire en instance de Projet
    const formData = this.simulationForm.value;
    const simulation = new Simulation({
      simulationDate: formData.simulationDate,
      personalDeposit: formData.personalDeposit,
      loanAmount: formData.loanAmount,
      loanPayment: formData.loanPayment,
      loanInterestRate: formData.loanInterestRate,
      loanInsuranceRate: formData.loanInsuranceRate,
      loanGuarantyRate: formData.loanGuarantyRate,
      loanDuration: formData.loanDuration,
      periodicity: formData.periodicity
    });

    // Sauvegarde l'instance du projet.
    console.log(simulation);
  }
}
