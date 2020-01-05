import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MortgageProjectService } from 'src/app/services/mortgage-project.service';
import { Borrower } from 'src/app/Models/borrower';

@Component({
  selector: 'app-emprunteur-form',
  templateUrl: './emprunteur-form.component.html',
  styleUrls: ['./emprunteur-form.component.css']
})
export class EmprunteurFormComponent implements OnInit {

  emprunteurForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private projectService: MortgageProjectService) { }

  ngOnInit() {
    this.emprunteurForm = this.fb.group({
      dateOfBirth: ['', Validators.required],
      netIncome: ['']
    });
  }

  saveEmprunteur() {
    // Transforme les données du formulaire en instance de Projet
    const formData = this.emprunteurForm.value;
    const emprunteur = new Borrower({
      dateOfBirth: formData.dateOfBirth,
      netIncome: formData.netIncome
    });

    // Sauvegarde l'instance du projet.
    console.log(emprunteur);
    /*
    this.projectService.addMortgageProject(project).subscribe(() => {
      // Confirmation
      alert('Projet bien enregistré !');
      this.router.navigate(['simulation/new']);
    });
    */
  }
}
