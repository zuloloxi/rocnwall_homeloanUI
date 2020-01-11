import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  // submitted = false;
  @Input() project: Project;
  @Input() simulation: Simulation;
  isSavedSimulation: boolean;

  @Output() submitNext = new EventEmitter<Simulation>();
  @Output() submitPrevious = new EventEmitter<Project>();

  displayError = false;
  errorMsg: string;

  constructor(private fb: FormBuilder, private router: Router, private simulationService: MortgageSimulationService) { }

  ngOnInit() {
    console.log(this.simulation);
    if (this.simulation === undefined) {
      this.isSavedSimulation = false;
      this.simulationForm = this.fb.group({
        simulationTarget: ['PAYMENT_TARGET', Validators.required],
        personalDeposit: ['0', Validators.required],
        loanAmount: ['0'],
        loanPayment: ['0'],
        loanInterestRate: ['1.00', Validators.compose([Validators.required, Validators.min(0), Validators.max(5)])],
        loanInsuranceRate: ['4.80', Validators.compose([Validators.required, Validators.min(0), Validators.max(5)])],
        loanGuarantyRate: ['1.25', Validators.compose([Validators.required, Validators.min(0), Validators.max(5)])],
        applicationFee: ['1000', Validators.compose([Validators.required, Validators.min(0), Validators.max(10000)])],
        loanDuration: ['15', Validators.compose([Validators.required, Validators.min(1), Validators.max(30)])],
        periodicity: ['Mensuelle', Validators.required],
        globalLoanPayment: ['']
      });
    } else {
      this.isSavedSimulation = true;
      this.simulationForm = this.fb.group({
        simulationTarget: ['PAYMENT_TARGET', Validators.required],
        personalDeposit: [this.simulation.personalDeposit, Validators.required],
        loanAmount: [this.simulation.loanAmount.toFixed(0)],
        loanPayment: [this.simulation.loanPayment.toFixed(0)],
        loanInterestRate: [this.simulation.loanInterestRate,
        Validators.compose([Validators.required, Validators.min(0), Validators.max(5)])],
        loanInsuranceRate: [this.simulation.loanInterestRate,
        Validators.compose([Validators.required, Validators.min(0), Validators.max(5)])],
        loanGuarantyRate: [this.simulation.loanGuarantyRate,
        Validators.compose([Validators.required, Validators.min(0), Validators.max(5)])],
        applicationFee: [this.simulation.applicationFee,
        Validators.compose([Validators.required, Validators.min(0), Validators.max(10000)])],
        loanDuration: [this.simulation.loanDuration, Validators.compose([Validators.required, Validators.min(1), Validators.max(30)])],
        periodicity: [this.simulation.periodicity, Validators.required],
        globalLoanPayment: [this.simulation.globalLoanPayment]
      });
    }
  }

  // Convenience getter for easy access to form fields
  get f() { return this.simulationForm.controls; }

  comeBack() {
    this.submitPrevious.emit(this.project);
  }

  saveSimulation() {
    // Transforme les données du formulaire en instance de Projet
    const formData = this.simulationForm.value;
    // Reset one of the two values (amount / payment) depending  on the target choice
    switch (formData.simulationTarget) {
      case 'PAYMENT_TARGET':
        formData.loanPayment = 0;
        break;
      case 'CAPITAL_TARGET':
        formData.loanAmount = 0;
    }

    if (this.isSavedSimulation === false) {
      this.simulation = new Simulation({
        personalDeposit: formData.personalDeposit,
        loanAmount: formData.loanAmount,
        loanPayment: formData.loanPayment,
        loanInterestRate: formData.loanInterestRate,
        loanInsuranceRate: formData.loanInsuranceRate,
        loanGuarantyRate: formData.loanGuarantyRate,
        applicationFee: formData.applicationFee,
        loanDuration: formData.loanDuration,
        periodicity: formData.periodicity,
        globalLoanPayment: formData.globalLoanPayment
      });
    } else {
      this.simulation.personalDeposit = formData.personalDeposit;
      this.simulation.loanAmount = formData.loanAmount;
      this.simulation.loanPayment = formData.loanPayment;
      this.simulation.loanInterestRate = formData.loanInterestRate;
      this.simulation.loanInsuranceRate = formData.loanInterestRate;
      this.simulation.loanGuarantyRate = formData.loanGuarantyRate;
      this.simulation.applicationFee = formData.applicationFee;
      this.simulation.loanDuration = formData.loanDuration;
      this.simulation.periodicity = formData.periodicity;
      this.simulation.globalLoanPayment = formData.globalLoanPayment;
    }

    // Sauvegarde l'instance du projet.
    console.log(this.simulation);
    console.log(this.project);

    if (this.isSavedSimulation === false) {
      this.simulationService.addSimulationToMortgageProject(this.project.id, this.simulation).subscribe(data => {
        this.simulation = data;
        this.project.simulations.push(this.simulation);
        this.submitNext.emit(this.simulation);
      },
        (error) => {
          this.errorMsg = `${error.statusText} (${error.status})`;
          this.displayError = true;
        });
    } else {
      this.simulationService.updateSimulationOfMortgageProject(this.project.id, this.simulation.id,
        this.simulation).subscribe(data => {
          this.simulation = data;
          this.project.simulations.push(this.simulation);
          this.submitNext.emit(this.simulation);
        },
          (error) => {
            this.errorMsg = `${error.statusText} (${error.status})`;
            this.displayError = true;
          });

    }
  }
}
