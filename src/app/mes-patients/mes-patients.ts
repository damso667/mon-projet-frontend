import { Component, OnInit } from '@angular/core';
import { Medecin } from '../services/medecin';
import { NgIf, NgForOf, NgClass } from '@angular/common';


@Component({
  selector: 'app-mes-patients',
  imports: [NgIf,NgForOf,NgClass],
  templateUrl: './mes-patients.html',
  styleUrl: './mes-patients.css',

})
export class MesPatients implements OnInit {
 patients: any[] = [];
  message = '';
    // --- mapping lisible des statuts (FR) ---
  consultationLabelMap: Record<string, string> = {
    'CONSULTE': 'Consulté',
    'EN_COURS': 'En attente',
    'EN_ATTENTE': 'Non consulté'
  };

  prelevementLabelMap: Record<string, string> = {
    'EFFECTUER': 'Effectué',
    'EN_COURS': 'En cours',
    'NON_EFFECTUER': 'Non effectué'
  };

  // petites icônes pour meilleure lisibilité
  consultationIconMap: Record<string, string> = {
    'EN_COURS': '✅',
    'EN_ATTENTE': '🕒',
    'NON_CONSULTE': '❓'
  };

  prelevementIconMap: Record<string, string> = {
    'EFFECTUER': '🧪',
    'EN_COURS': '⏳',
    'NON_EFFECTUER': '❌'
  };

  // --- classes dynamiques pour ngClass (Bootstrap 5) ---
  getConsultationBadgeClasses(status: string) {
    return {
      'bg-success': status === 'EN_COURS',
      'bg-warning': status === 'EN_ATTENTE',
      'text-dark': status === 'EN_ATTENTE',
      'bg-secondary': status === 'NON_CONSULTER'
    };
  }

  getPrelevementBadgeClasses(status: string) {
    return {
      'bg-success': status === 'EFFECTUE',
      'bg-warning': status === 'EN_COURS',
      'text-dark': status === 'EN_COURS',
      'bg-danger': status === 'NON_EFFECTUE'
    };
  }

  // optimisation ngFor
  trackByPatient(index: number, p: any) {
    return p.id ?? index;
  }

  constructor(private medecinService: Medecin) {}

  ngOnInit(): void {
    this.medecinService.getMesPatients().subscribe({
      next: (res: any) => this.patients = res,
      error: () => this.message = 'Erreur de chargement de vos patients.'
    });
  }
}
