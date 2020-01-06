import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from '../../Models/mortgage-project';
import { MortgageProjectService } from 'src/app/services/mortgage-project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})

export class ProjectFormComponent implements OnInit {

  projectForm: FormGroup;
  @Output() submitNext = new EventEmitter<Project>();

  currentProject: Project;

  constructor(private fb: FormBuilder, private router: Router, private projectService: MortgageProjectService) { }

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
    this.currentProject = new Project({
      referenceId: formData.referenceId,
      projectType: formData.projectType,
      householdCharges: formData.householdCharges,
      maxLoanPayment: formData.maxLoanPayment
    });

    // Sauvegarde l'instance du projet.
    this.projectService.addMortgageProject(this.currentProject).subscribe(data => {
      this.currentProject = data;
      console.log(this.currentProject)
      this.submitNext.emit(this.currentProject);
    });
  }
}
