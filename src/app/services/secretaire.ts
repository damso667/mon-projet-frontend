import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Reactif {
  id: number;
  nom: string;
  code: string;
  unite: string;
  stock: number;
  dernierModifieParId: number;
}

export interface ReactifRequest {
  typeExamenNom: string;
  typeExamenDescription: string;
  nom: string;
  code: string;
  unite: string;
  stock: number;
  quantiteParAnalyse: number;
}

@Injectable({
  providedIn: 'root'
})
export class Secretaire {
  private apiUrl = 'https://backend-mon-projet-0f46.onrender.com/api/secretaires';

  constructor(private http: HttpClient) {}

  // Configuration pour autoriser l'envoi du cookie de session
  private httpOptions = { withCredentials: true };

  // GET /api/secretaires
  getAll(): Observable<Reactif[]> {
    return this.http.get<Reactif[]>(this.apiUrl, this.httpOptions);
  }

  // POST /api/secretaires/creer
  create(reactif: ReactifRequest): Observable<Reactif> {
    return this.http.post<Reactif>(`${this.apiUrl}/creer`, reactif, this.httpOptions);
  }

  // PUT /api/secretaires/reactifs/{id}/augmenter
  augmenterStock(id: number, quantite: number): Observable<Reactif> {
    return this.http.put<Reactif>(`${this.apiUrl}/reactifs/${id}/augmenter?quantite=${quantite}`, {}, this.httpOptions);
  }

  // PUT /api/secretaires/{id}/diminuer
  diminuerStock(id: number, quantite: number): Observable<Reactif> {
    return this.http.put<Reactif>(`${this.apiUrl}/${id}/diminuer?quantite=${quantite}`, {}, this.httpOptions);
  }

  // DELETE /api/secretaires/supprimer/{id}
  supprimer(id: number): Observable<any> {
    // Pour DELETE, les options sont en 2ème argument
    return this.http.delete(`${this.apiUrl}/supprimer/${id}`, this.httpOptions);
  }
}