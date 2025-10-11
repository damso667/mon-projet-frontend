import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface AnalyseDto{
  id:number;
  patientId: number;
  medecinId:number;
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
   private apiUrl = 'http://localhost:8080/api/techniciens';

  constructor(private http: HttpClient) {}

  // GET /api/techniciens/analyses-a-faire
  getAnalysesAFaire(): Observable<any> {
    return this.http.get(`${this.apiUrl}/analyses-a-faire`, { withCredentials: true });
  }

  // GET /api/techniciens/mes-analyses

   getMesAnalyse():Observable<any>{
    return this.http.get(`${this.apiUrl}/mes-analyses`, { withCredentials: true });

   }

  // POST /api/techniciens/analyses/{id}/prendre
  prendreAnalyse(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/analyses/${id}/prendre`, {}, { withCredentials: true });
  }


  // POST /api/techniciens/analyses/{id}/prelevements
  enregistrerPrelevement(id: number, typePrelevement: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/analyses/${id}/prelevements?typePrelevement=${typePrelevement}`, {withCredentials: true})

  }

  // PATCH /api/techniciens/analyses/{id}/resultats
  saisirResultats(id: number, resultats: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/analyses/${id}/resultats`, resultats, { withCredentials: true });
  }

 // GET /api/techniciens/analyses/recuperees
   mesAnalyse(): Observable<AnalyseDto[]> {
    return this.http.get<any>(`${this.apiUrl}/analyse/recuperees`).pipe(
      map(resp => resp.data as AnalyseDto[])
    )
  }

 

}
