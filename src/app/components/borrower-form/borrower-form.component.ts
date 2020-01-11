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
  @Input() isSavedProject: boolean;

  @Output() submitPrevious = new EventEmitter<any>();
  @Output() submitNext = new EventEmitter<Project>();

  displayError = false;
  errorMsg: string;

  constructor(private fb: FormBuilder, private router: Router, private projectService: MortgageProjectService) { }

  ngOnInit() {
    this.borrowerForm = this.fb.group({
      dateOfBirth: ['1980-01-01', Validators.required],
      netIncome: ['4000', Validators.required],
      borrowers: this.fb.array([])
    });
    this.borrowerList = this.borrowerForm.get('borrowers') as FormArray;
    if (this.project.borrowers.length === 0) {
      this.addNewBorrower();
    } else {
      for (const borrower of this.project.borrowers) {
        this.addBorrower(borrower.dateOfBirth.toString(), borrower.netIncome.toString());
      }
    }
  }

    // Convenience getter for easy access to form fields
    get f() { return this.borrowerForm.controls; }

  comeBack() {
    this.submitPrevious.emit(this.project);
  }

  getBorrowers(): FormArray {
    return this.borrowerForm.get('borrowers') as FormArray;
  }

  newBorrower(initDate: string, initIncome: string): FormGroup {
    return this.fb.group({
      dateOfBirth: [initDate, Validators.required],
      netIncome: [initIncome]
    });
  }

  addNewBorrower() {
    this.addBorrower('1980-01-01', '4000');
  }

  addBorrower(initDate: string, initIncome: string) {
    this.borrowerList.push(this.newBorrower(initDate, initIncome));
  }

  removeBorrower(i: number) {
    this.borrowerList.removeAt(i);
  }

  saveBorrower() {
    const formData = this.borrowerForm.value;
    this.project.borrowers = formData.borrowers;

    // Sauvegarde l'instance du projet.
    this.projectService.updateMortgageProject(this.project).subscribe(data => {
      this.project.maxLoanPayment = data.maxLoanPayment;
      this.submitNext.emit(this.project);
    },
      (error) => {
        this.errorMsg = `${error.statusText} (${error.status})`;
        this.displayError = true;
      });
  }
}
