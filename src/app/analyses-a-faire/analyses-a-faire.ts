import { Component, OnInit } from '@angular/core';
import { Technicien } from '../services/technicien';
import { NgIf, NgFor, DatePipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-analyses-a-faire',
  imports: [NgIf,NgForOf,DatePipe],
  templateUrl: './analyses-a-faire.html',
  styleUrl: './analyses-a-faire.css'
})
export class AnalysesAFaire implements OnInit {
  analyses: any[] = [];
  message: string | null = null;

  constructor(private technicienService: Technicien) {}

  ngOnInit(): void {
    this.chargerAnalyses();
  }

  chargerAnalyses() {
    this.technicienService.getAnalysesAFaire().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.analyses = res.data; // ton API renvoie ApiResponse.ok(list)
        } else {
          this.message = res.message;
        }
      },
      error: () => this.message = "Erreur de chargement des analyses."

    });
  }



  prendreAnalyse(id: number) {
    this.technicienService.prendreAnalyse(id).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.message = "Analyse prise avec succès ✅"
          this.chargerAnalyses(); // refresh

          setTimeout(() =>{
         this.message = null
        },2000)
        
        } else {
          this.message = res.message;
        }
     setTimeout(() => {
    this.message  = null;
  }, 1000);
      },
      error: () => this.message = "Impossible de prendre l’analyse."
    });
  }
}
