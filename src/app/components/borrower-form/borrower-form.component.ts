import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  @Input() project: Project;
  borrower: Borrower;

  @Output() submitNext = new EventEmitter<Project>();

  constructor(private fb: FormBuilder,
              private router: Router,
              private projectService: MortgageProjectService) { }

  ngOnInit() {
    this.borrowerForm = this.fb.group({
      dateOfBirth: ['1980-01-01', Validators.required],
      netIncome: ['4000']
    });
    console.log('borrowerForm');
    console.log(this.project);
  }

  saveBorrower() {
    // Transforme les données du formulaire en instance de Projet
    const formData = this.borrowerForm.value;
    this.borrower = new Borrower({
      dateOfBirth: formData.dateOfBirth,
      netIncome: formData.netIncome
    });
    console.log(this.borrower);
    this.project.borrowers.push(this.borrower);

    // Sauvegarde l'instance du projet.

    console.log(this.project);

    this.projectService.updateMortgageProject(this.project).subscribe( () => {
      // Confirmation
      // alert('Projet bien enregistré !');
      this.submitNext.emit(this.project);
    });
  }
}
