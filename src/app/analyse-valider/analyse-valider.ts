import { Component } from '@angular/core';
import { Analyse, Medecin } from '../services/medecin';
import { DatePipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-analyse-valider',
  imports: [NgIf,NgForOf,DatePipe],
  templateUrl: './analyse-valider.html',
  styleUrl: './analyse-valider.css'
})
export class AnalyseValider {
  analyses: Analyse[] = [];
  loading = false;

  constructor(private medecin: Medecin) {}

  ngOnInit(): void {
    this.fetchAnalyses();
  }

  fetchAnalyses(): void {
    this.loading = true;
    this.medecin.getAnalysesValidees().subscribe({
      next: (data) => {
        this.analyses = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
