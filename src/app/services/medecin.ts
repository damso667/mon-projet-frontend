import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Analyse {
  id: number;
  description?: string;
  resultats?: string;
  dateAnalyse: string;
  dateValidation: string;
  valide: boolean;
  patientNom: { id: number, nom?: string };
  typeExamenNom: { id: number, nom?: string };
}
export interface Notification {
  id: number;
  message: string;
  dateCreation: string;
  lue: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class Medecin {
    private apiUrl = 'http://localhost:8080/api/medecins';

  constructor(private http: HttpClient) {}

  // GET /api/medecins/patients
  getPatients(disponibles: boolean = true): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/patients?disponibles=${disponibles}`, { withCredentials: true });
  }

  // GET /api/medecins/mes-patient
  getMesPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mes-patient`, { withCredentials: true });
  }

  // PUT /api/medecins/patients/{id}/recuperer
  recupererPatient(id: Number): Observable<any> {
    return this.http.put(`${this.apiUrl}/patients/${id}/recuperer`, {}, { withCredentials: true });
  }

  // POST /api/medecins/analyses
  prescrireAnalyse(patientId: number, typeExamenId: number, description?: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/analyses`,
      { description },
      { params: { patientId, typeExamenId }, withCredentials: true });
  }

  // PATCH /api/medecins/analyses/{id}/valider
  validerAnalyse(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/analyses/${id}/valider`, {}, { withCredentials: true });
  }

    getAnalyseAValider(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/analyses/a-valider`, { withCredentials: true });
  }

     getResultat(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/analyses/resultats`, { withCredentials: true });
  }

  getAnalysesValidees(): Observable<Analyse[]> {
    return this.http.get<Analyse[]>(`${this.apiUrl}/analyses/validees`);
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/notifications`);
  }

  marquerCommeLue(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/notifications/${id}/marquer-lue`, {});
  }
}
