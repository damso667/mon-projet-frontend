import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface AnalyseDto {
  id: number;
  patientId: number;
  medecinId: number;
  technicienId: number;
  typeExamenId: number;
  description: string;
  resultats: string;
  valide: boolean;
  dateAnalyse: string;
  dateValidation: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class Technicien {
  private apiUrl = 'https://backend-mon-projet-0f46.onrender.com/api/techniciens';

  constructor(private http: HttpClient) {}

  // Option réutilisable pour éviter les répétitions
  private httpOptions = { withCredentials: true };

  // GET /api/techniciens/analyses-a-faire
  getAnalysesAFaire(): Observable<any> {
    return this.http.get(`${this.apiUrl}/analyses-a-faire`, this.httpOptions);
  }

  // GET /api/techniciens/mes-analyses
  getMesAnalyse(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mes-analyses`, this.httpOptions);
  }

  // POST /api/techniciens/analyses/{id}/prendre
  prendreAnalyse(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/analyses/${id}/prendre`, {}, this.httpOptions);
  }

  // POST /api/techniciens/analyses/{id}/prelevements
  enregistrerPrelevement(id: number, typePrelevement: string): Observable<any> {
    // Correction : Ajout d'un body vide {} avant les options
    return this.http.post(`${this.apiUrl}/analyses/${id}/prelevements?typePrelevement=${typePrelevement}`, {}, this.httpOptions);
  }

  // PATCH /api/techniciens/analyses/{id}/resultats
  saisirResultats(id: number, resultats: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/analyses/${id}/resultats`, resultats, this.httpOptions);
  }

  // GET /api/techniciens/analyses/recuperees
  mesAnalyse(): Observable<AnalyseDto[]> {
    // AJOUTÉ ICI : withCredentials
    return this.http.get<any>(`${this.apiUrl}/analyse/recuperees`, this.httpOptions).pipe(
      map(resp => resp.data as AnalyseDto[])
    );
  }
}