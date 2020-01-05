import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Project } from '../Models/mortgage-project';

@Injectable({
  providedIn: 'root'
})
export class MortgageProjectService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

  constructor(private http: HttpClient,
              @Inject('BACKEND_URL') private baseUrl: string) { }

  // Load the list of all mortgage projects.
  getAllMortgageProjects(): Observable<Project[]> {
    return this.http.get(`${this.baseUrl}/mortgageProjects`)
      // Re-hydrate
      .pipe(
        map((mortgageProjectArray: any[]) =>
          mortgageProjectArray.map(mortgageProjectDTO =>
            new Project(mortgageProjectDTO)))
      );
  }

  // Load the given mortgage project.
  getMortgageProject(mortgageProjectId: string): Observable<Project> {
    return this.http.get(`${this.baseUrl}/mortgageProjects/${mortgageProjectId}`)
      .pipe(
        map((mortgageProjectDTO: any) =>
          new Project(mortgageProjectDTO)),
        catchError(this.muteRequestError),
      );
  }

  // POST : add a new mortgage product to the server
  addMortgageProject(mortgageProjectDTO: Project): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/mortgageProjects`, mortgageProjectDTO, this.httpOptions);
  }

  // PUT : update an existing mortgage product to the server
  updateMortgageProject(mortgageProjectDTO: Project): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/mortgageProjects/` + mortgageProjectDTO.id, mortgageProjectDTO, this.httpOptions);
  }

  // DELETE : delete an existing mortgage product to the server
  deleteMortgageProject(id: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/mortgageProjects` + id);
  }

  // Catch (and rethrow).
  private muteRequestError(err: any): Observable<any> {
    const errorMsg = `${err.statusText} (${err.status})`;
    return of(null);
  }
}