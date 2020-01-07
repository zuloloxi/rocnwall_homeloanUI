import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MortgageProjectService } from 'src/app/services/mortgage-project.service';
import { Simulation } from 'src/app/Models/simulation';
import { Project } from 'src/app/Models/mortgage-project';
import { MortgageSimulationService } from 'src/app/services/mortgage-simulation.service';

@Component({
  selector: 'app-simulation-form',
  templateUrl: './simulation-form.component.html',
  styleUrls: ['./simulation-form.component.css']
})
export class SimulationFormComponent implements OnInit {

  simulationForm: FormGroup;
  @Input() project: Project;
  simulation: Simulation;

  @Output() submitNext = new EventEmitter<Simulation>();

  constructor(private fb: FormBuilder, private router: Router, private simulationService: MortgageSimulationService) { }

  ngOnInit() {
    this.simulationForm = this.fb.group({
      simulationTarget: ['CAPITAL_TARGET', Validators.required],
      personalDeposit: ['0'],
      loanAmount: ['0'],
      loanPayment: ['0'],
      loanInterestRate: ['1.00'],
      loanInsuranceRate: ['3.5', Validators.required],
      loanGuarantyRate: ['1.5', Validators.required],
      applicationFee: ['0', Validators.required],
      loanDuration: ['15', Validators.required],
      periodicity: ['MONTHLY', Validators.required]
    });
  }

  saveSimulation() {
    // Transforme les données du formulaire en instance de Projet
    const formData = this.simulationForm.value;
    this.simulation = new Simulation({
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
    console.log(this.simulation);
    console.log(this.project);

    this.simulationService.addSimulationToMortgageProject(this.project.id, this.simulation).subscribe(data => {
      this.simulation = data;
      this.project.simulations.push(this.simulation);
      // Confirmation
      // alert('Projet bien enregistré !');
      this.submitNext.emit(this.simulation);
    });
  }
}