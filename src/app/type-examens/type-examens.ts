import { NgIf, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TypeExamen } from '../services/type-examen';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-type-examens',
  imports: [NgIf,NgForOf,FormsModule],
  templateUrl: './type-examens.html',
  styleUrl: './type-examens.css'
})
export class TypeExamens implements OnInit {
  examens: any[] = [];
  message = '';
    filteredExamens: any[] = [];
  searchTerm = '';

  constructor(private service: TypeExamen) {}

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (res: any) => {this.examens = res.data ?? res;  // selon ta réponse API
                          this.filteredExamens = this.examens;},
      error: () => this.message = 'Erreur de chargement des types.'
    });
  }
    applyFilter(): void {
    const lower = this.searchTerm.trim().toLowerCase();
    if (!lower) {
      this.filteredExamens = this.examens;
    } else {
      this.filteredExamens = this.examens.filter(e =>
        (e.nom && e.nom.toLowerCase().includes(lower)) ||
        (e.description && e.description.toLowerCase().includes(lower))
      );
    }
  }
}


