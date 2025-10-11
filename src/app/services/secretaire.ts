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
  private apiUrl = 'http://localhost:8080/api/secretaires';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Reactif[]> {
    return this.http.get<Reactif[]>(this.apiUrl);
  }

  create(reactif: ReactifRequest): Observable<Reactif> {
    return this.http.post<Reactif>(`${this.apiUrl}/creer`, reactif);
  }

  augmenterStock(id: number, quantite: number): Observable<Reactif> {
    return this.http.put<Reactif>(`${this.apiUrl}/reactifs/${id}/augmenter?quantite=${quantite}`, {});
  }
    diminuerStock(id: number, quantite: number): Observable<Reactif> {
    return this.http.put<Reactif>(`${this.apiUrl}/${id}/diminuer?quantite=${quantite}`, {});
  }

  //DELETE api/secretaire/supprimer/{id}

  supprimer(id:number){
    return this.http.delete(`${this.apiUrl}/supprimer/${id}`,{});
  }
}
