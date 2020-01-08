import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MortgageProjectService } from 'src/app/services/mortgage-project.service';
import { Borrower } from 'src/app/Models/borrower';
import { Project } from 'src/app/Models/mortgage-project';

@Component({
  selector: 'app-borrower-form',
  templateUrl: './borrower-form.component.html',
  styleUrls: ['./borrower-form.component.css']
})
export class BorrowerFormComponent implements OnInit {

  borrowerForm: FormGroup;
  public borrowerList: FormArray;

  @Input() project: Project;
  borrower: Borrower;

  @Output() submitNext = new EventEmitter<Project>();

  constructor(private fb: FormBuilder,
    private router: Router,
    private projectService: MortgageProjectService) { }

  ngOnInit() {
    this.borrowerForm = this.fb.group({
      borrowers: this.fb.array([this.newBorrower()])
    });
    this.borrowerList = this.borrowerForm.get('borrowers') as FormArray;
  }

  getBorrowers(): FormArray {
    return this.borrowerForm.get('borrowers') as FormArray;
  }

  newBorrower(): FormGroup {
    return this.fb.group({
      dateOfBirth: ['1980-01-01', Validators.required],
      netIncome: ['10']
    });
  }

  addBorrower() {
    this.borrowerList.push(this.newBorrower());
  }

  removeBorrower(i: number) {
    this.borrowerList.removeAt(i);
  }

  onSubmit() {
    console.log(this.borrowerForm.value);
  }

  saveBorrower() {
    const formData = this.borrowerForm.value;
    for (let borrower of formData.borrowers) {
      // for (let i = 0; i < this.borrowerList.length; i++) {  //How to properly iterate here!!
      console.log(borrower);
      console.log('toto');
    }
    //   // Transforme les données du formulaire en instance de Projet
    //   const formData = this.borrowerForm.value;
    //   this.borrower = new Borrower({
    //     dateOfBirth: formData.dateOfBirth,
    //     netIncome: formData.netIncome
    //   });
    //   console.log(this.borrower);
    this.project.borrowers = formData.borrowers;

    // Sauvegarde l'instance du projet.

    console.log(this.project);

    this.projectService.updateMortgageProject(this.project).subscribe(data => {
      this.project.maxLoanPayment = data.maxLoanPayment;
      this.submitNext.emit(this.project);
    });
  }
}
