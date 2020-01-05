import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from '../Models/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.projectForm = this.fb.group({
      referenceId: ['', Validators.required],
      projectType: ['Achat', Validators.required],
      householdCharges: [''],
      maxLoanPayment: ['']
    });
  }

  saveProject() {
    // Transforme les données du formulaire en instance de Projet
    const formData = this.projectForm.value;
    const project = new Project({
      referenceId: formData.referenceId,
      householdCharges: formData.householdCharges,
      maxLoanPayment: formData.maxLoanPayment
    });

    // Sauvegarde l'instance de quiz.
    console.log(project);
    console.log(formData.projectType);
    this.router.navigate(['simulation/new']);
  }
}
