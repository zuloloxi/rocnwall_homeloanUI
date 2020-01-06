import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Simulation } from '../Models/simulation';
import { Project } from '../Models/mortgage-project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MortgageSimulationService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

  constructor(private http: HttpClient,
              @Inject('BACKEND_URL') private baseUrl: string) { }

  // POST : add a new simulationto the project
  addSimulationToMortgageProject(mortageProjectId: string, simulationDTO: Simulation): Observable<Simulation> {
    return this.http.post<Simulation>(`${this.baseUrl}/mortgageProjects/` + mortageProjectId + '/homeloanSimulations/',
      simulationDTO, this.httpOptions);
  }

  updateMortgageProject(mortgageProjectDTO: Project): Observable<Project> {
    console.log(mortgageProjectDTO);
    return this.http.put<Project>(`${this.baseUrl}/mortgageProjects/` + mortgageProjectDTO.id, mortgageProjectDTO, this.httpOptions);
  }
}
