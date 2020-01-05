import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from '../../Models/mortgage-project';
import { MortgageProjectService } from 'src/app/services/mortgage-project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private projectService: MortgageProjectService) { }

  ngOnInit() {
    this.projectForm = this.fb.group({
      referenceId: ['', Validators.required],
      projectType: ['PURCHASE', Validators.required],
      householdCharges: [''],
      maxLoanPayment: ['']
    });
  }

  saveProject() {
    // Transforme les données du formulaire en instance de Projet
    const formData = this.projectForm.value;
    const project = new Project({
      referenceId: formData.referenceId,
      projectType: formData.projectType,
      householdCharges: formData.householdCharges,
      maxLoanPayment: formData.maxLoanPayment
    });

    // Sauvegarde l'instance du projet.
    console.log(project);
    this.projectService.addMortgageProject(project).subscribe(() => {
      // Confirmation
      alert('Projet bien enregistré !');
      this.router.navigate(['simulation/new']);
    });
  }
}
