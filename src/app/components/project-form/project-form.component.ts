import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  @Input() project: Project;
  @Input() isSavedProject: boolean;
  @Output() submitNext = new EventEmitter<Project>();
  @Output() submitPrevious = new EventEmitter<any>();

  currentProject: Project;

  constructor(private fb: FormBuilder, private router: Router, private projectService: MortgageProjectService) { }

  ngOnInit() {
    if (!this.isSavedProject) {
      this.projectForm = this.fb.group({
        referenceId: [Math.random().toString(10),
                        Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
        projectType: ['PURCHASE', Validators.required],
        householdCharges: ['100']
      });
    } else {
      this.projectForm = this.fb.group({
        referenceId: [this.project.referenceId, Validators.required],
        projectType: [this.project.projectType, Validators.required],
        householdCharges: [this.project.householdCharges]
      });
    }
  }
  // Convenience getter for easy access to form fields
  get f() { return this.projectForm.controls; }

  saveProject() {
    // Transforme les données du formulaire en instance de Projet
    const formData = this.projectForm.value;
    if (!this.isSavedProject) {
      this.project = new Project({
        referenceId: formData.referenceId,
        projectType: formData.projectType,
        householdCharges: formData.householdCharges
      });

      // Crée une nouvelle instance du projet
      this.projectService.addMortgageProject(this.project).subscribe(data => {
        // Récupération de l'Id du projet créé dans le backend
        this.project.id = data.id;
        console.log(this.project);
        this.submitNext.emit(this.project);
      });
    } else {
      this.project.referenceId = formData.referenceId;
      this.project.projectType = formData.projectType;
      this.project.householdCharges = formData.householdCharges;
      // Modifie l'instance existante
      this.projectService.updateMortgageProject(this.project).subscribe(data => {
        this.submitNext.emit(this.project);
      });
    }
  }


}
