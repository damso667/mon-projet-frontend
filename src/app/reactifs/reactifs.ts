import { NgForOf, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {  Reactif, ReactifRequest, Secretaire } from '../services/secretaire';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-reactifs',
  imports: [FormsModule,NgIf,NgForOf,ReactiveFormsModule],
  templateUrl: './reactifs.html',
  styleUrl: './reactifs.css'
})
export class Reactifs implements OnInit {
  reactifs: Reactif[] = [];
  newReactif: ReactifRequest = {
    typeExamenNom: '',
    typeExamenDescription: '',
    nom: '',
    code: '',
    unite: '',
    stock: 0,
    quantiteParAnalyse: 0
  };
  quantiteAugmenter: number = 0;
  role: 'ROLE_MEDECIN' | 'ROLE_TECHNITIEN' | 'ROLE_SECRETAIRE' | null = null;


  constructor(private reactifService: Secretaire,private auth: Auth) {
        this.role = this.auth.getRole?.() as 'ROLE_MEDECIN' | 'ROLE_TECHNITIEN' | 'ROLE_SECRETAIRE' | null ;
  }

  ngOnInit(): void {
    this.loadReactifs();
  }

  loadReactifs() {
    this.reactifService.getAll().subscribe(data => {
      this.reactifs = data;
    });
  }

  addReactif() {
    this.reactifService.create(this.newReactif).subscribe(() => {
      this.loadReactifs();
      this.resetForm();
    });
  }

  augmenterStock(id: number) {
    if (this.quantiteAugmenter > 0) {
      this.reactifService.augmenterStock(id, this.quantiteAugmenter).subscribe(() => {
        this.loadReactifs();
        this.quantiteAugmenter = 0;
      });
    }
  }
    diminuerStock(id: number) {
    if (this.quantiteAugmenter > 0) {
      this.reactifService.diminuerStock(id, this.quantiteAugmenter).subscribe(() => {
        this.loadReactifs();
        this.quantiteAugmenter = 0;
      });
    }
  }

  resetForm() {
    this.newReactif = {
      typeExamenNom: '',
      typeExamenDescription: '',
      nom: '',
      code: '',
      unite: '',
      stock: 0,
      quantiteParAnalyse: 0
    };
  }

  @Input() reactif: any;
  messageS: string | null = null
  messageE: string | null = null

  showDialog: boolean = false;
  idASupprimer: number | null = null;

  confimerSuppression(id: number){
    this.idASupprimer =id
    this.showDialog = true
  }

  annulerSuppression(){
    this.showDialog =false
    this.idASupprimer= null
  }
  confirmerSuppressionOui(){
    if(this.idASupprimer!== null){
      this.supprimere(this.idASupprimer)
      this.showDialog=false
      this.idASupprimer = null
    }
  }

  supprimere(id:number){

    this.reactifService.supprimer(id).subscribe({
      next: () =>{
        this.messageS =  'Reactif a et supprimer avec succes'
        setTimeout(()=>{
          this.messageS = null;

        },1000)
      },
      error: (err)=>{
        this.messageS =  "Reactif n'a pas ete supprimer "
        setTimeout(()=>{
          this.messageE = null;

        },3000)
      }
    })
  }
}
