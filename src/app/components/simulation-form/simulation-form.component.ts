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
  simulation: Simulation;

  @Output() submitNext = new EventEmitter<Simulation>();
  @Output() submitPrevious = new EventEmitter<Project>();

  displayError = false;
  errorMsg: string;

  constructor(private fb: FormBuilder, private router: Router, private simulationService: MortgageSimulationService) { }

  ngOnInit() {
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
      periodicity: ['MONTHLY', Validators.required],
      globalLoanPayment: ['']
    });
  }

    // Convenience getter for easy access to form fields
    get f() { return this.simulationForm.controls; }

    // get per() {
    // switch(this.simulationForm.value.periodicity) {
    //       case: MONTHLY return "mensuelle";
    //       case: QUARTERLY return "trimestrielle";
    //       case: BIANNUALLY return "semestrielle";
    //       case: ANNUALLY return "annuelle"; }
    //   }

  comeBack() {
    this.submitPrevious.emit(this.project);
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
      applicationFee: formData.applicationFee,
      loanDuration: formData.loanDuration,
      periodicity: formData.periodicity,
      globalLoanPayment: formData.globalLoanPayment
    });

    // Sauvegarde l'instance du projet.
    console.log(this.simulation);
    console.log(this.project);

    this.simulationService.addSimulationToMortgageProject(this.project.id, this.simulation).subscribe(data => {
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
