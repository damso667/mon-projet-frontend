import { NgIf, NgForOf, DatePipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AnalyseDto, Technicien } from '../services/technicien';

@Component({
  selector: 'app-mes-analyses',
  imports: [NgIf,NgForOf,DatePipe,NgClass],
  templateUrl: './mes-analyses.html',
  styleUrl: './mes-analyses.css'
})
export class MesAnalyses {
  analyses: AnalyseDto[] = [];  
  loading = false;
  error: string | null = null;

  constructor(private analyseService: Technicien) {}

  ngOnInit(): void {
    this.loadAnalyses();
  }

  loadAnalyses(): void {
    this.loading = true;
    this.error = null;
    this.analyseService.mesAnalyse().subscribe({
      next: (data) => {
        this.analyses = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des analyses';
        this.loading = false;
      }
    });
  }

  badgeClass(valide: boolean): string {
    return valide ? 'bg-success' : 'bg-warning text-dark';
  }

  badgeText(valide: boolean): string {
    return valide ? 'Validée' : 'En cours';
  }
}
