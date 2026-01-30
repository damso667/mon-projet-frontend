import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

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
  private apiUrl = 'https://backend-mon-projet-0f46.onrender.com/api/medecins';

  constructor(private http: HttpClient) {}

  // Option de configuration réutilisable pour plus de clarté
  private httpOptions = { withCredentials: true };

  // GET /api/medecins/patients
  getPatients(disponibles: boolean = true): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/patients?disponibles=${disponibles}`, this.httpOptions);
  }

  // GET /api/medecins/mes-patient
  getMesPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mes-patient`, this.httpOptions);
  }

  // PUT /api/medecins/patients/{id}/recuperer
  recupererPatient(id: Number): Observable<any> {
    return this.http.put(`${this.apiUrl}/patients/${id}/recuperer`, {}, this.httpOptions);
  }

  // POST /api/medecins/analyses
  prescrireAnalyse(patientId: number, typeExamenId: number, description: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/analyses`,
      { patientId, typeExamenId, description },
      this.httpOptions // AJOUTÉ ICI
    );
  }

  // PATCH /api/medecins/analyses/{id}/valider
  validerAnalyse(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/analyses/${id}/valider`, {}, this.httpOptions);
  }

  getAnalyseAValider(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/analyses/a-valider`, this.httpOptions);
  }

  getResultat(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/analyses/resultats`, this.httpOptions);
  }

  getAnalysesValidees(): Observable<Analyse[]> {
    return this.http.get<Analyse[]>(`${this.apiUrl}/analyses/validees`, this.httpOptions); // AJOUTÉ ICI
  }

  private unreadCountSubject = new BehaviorSubject<number>(0);
  unreadCount$ = this.unreadCountSubject.asObservable();

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/notifications`, this.httpOptions).pipe( // AJOUTÉ ICI
      tap(notifs => {
        const count = notifs.filter(n => !n.lue).length;
        this.unreadCountSubject.next(count);
      })
    );
  }

  marquerCommeLue(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/notifications/${id}/marquer-lue`, {}, this.httpOptions).pipe( // AJOUTÉ ICI
      tap(() => {
        const currentCount = this.unreadCountSubject.value;
        if (currentCount > 0) {
          this.unreadCountSubject.next(currentCount - 1);
        }
      })
    );
  }
}