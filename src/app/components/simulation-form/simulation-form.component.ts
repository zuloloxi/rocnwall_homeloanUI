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

  constructor(private fb: FormBuilder, private router: Router, private simulationService: MortgageSimulationService) { }

  ngOnInit() {
    this.simulationForm = this.fb.group({
      simulationTarget: ['PAYMENT_TARGET', Validators.required],
      personalDeposit: ['', Validators.required],
      loanAmount: [''],
      loanPayment: [''],
      loanInterestRate: ['1.00', Validators.required],
      loanInsuranceRate: ['4.80', Validators.required],
      loanGuarantyRate: ['1.25', Validators.required],
      applicationFee: ['1000', Validators.required],
      loanDuration: ['15', Validators.required],
      periodicity: ['MONTHLY', Validators.required],
      globalLoanPayment: ['']
    });
  }

  comeBack() {
    this.submitPrevious.emit(this.project);
  }

  // Convenience getter for easy access to form fields
  get f() { return this.simulationForm.controls; }

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
      // Confirmation
      // alert('Projet bien enregistré !');
      this.submitNext.emit(this.simulation);
    });
  }
}
