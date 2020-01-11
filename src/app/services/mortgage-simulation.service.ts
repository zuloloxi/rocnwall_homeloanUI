import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Simulation } from '../Models/simulation';
import { Project } from '../Models/mortgage-project';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  // POST : add a new simulationto the project
  updateSimulationOfMortgageProject(mortageProjectId: string, simulationId: string, simulationDTO: Simulation): Observable<Simulation> {
    return this.http.put<Simulation>(`${this.baseUrl}/mortgageProjects/` + mortageProjectId + '/homeloanSimulations/' + simulationId,
      simulationDTO, this.httpOptions);
  }

  // GET : get the simulation associated to a projet
  // in this release, we don't support several simulations for a single project, so we keep only the first record
  getSimulation(mortageProjectId: string): Observable<Simulation> {
    return this.http.get<Simulation[]>(`${this.baseUrl}/mortgageProjects/` + mortageProjectId + '/homeloanSimulations/', this.httpOptions)
      .pipe(
        map(results => results[0]),
        map(simulationData => new Simulation(simulationData)),
      );;
  }


  // GET : get the simulation associated to a projet
  // in this release, we don't support several simulations for a single project, so we keep only the first record
  getAllSimulations(mortageProjectId: string): Observable<Simulation[]> {
    return this.http.get<Simulation[]>(`${this.baseUrl}/mortgageProjects/` + mortageProjectId + '/homeloanSimulations/', this.httpOptions)
      .pipe(
        map((simulationArray: any[]) => simulationArray.
        map(simulationData => new Simulation(simulationData)))
      );
  }

}
