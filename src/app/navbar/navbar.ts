import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Medecin, Notification } from '../services/medecin';

@Component({
  selector: 'app-navbar',
  imports: [NgIf, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  role: 'ROLE_MEDECIN' | 'ROLE_TECHNITIEN' | 'ROLE_SECRETAIRE' | null = null;
  animateBadge: boolean = false

  constructor(private auth: Auth, private router: Router, private notificationService: Medecin) {
    this.role = this.auth.getRole?.() as 'ROLE_MEDECIN' | 'ROLE_TECHNITIEN' | 'ROLE_SECRETAIRE' | null; // méthode que tu avais pour récupérer le rôle
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  notifications: Notification[] = [];
  loading = false;
  number: number = 0;



  ngOnInit(): void {
    this.notificationService.unreadCount$.subscribe(count => {
    this.number = count; // Le chiffre s'actualise tout seul ! 
    
    // Déclenche l'animation du badge [cite: 22]
    this.animateBadge = true;
    setTimeout(() => this.animateBadge = false, 200);
  });

  // Chargement initial [cite: 17]
  this.notificationService.getNotifications().subscribe();
  }

  fetchNotifications(): void {
    this.loading = true;
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        this.loading = false;

        // SOLUTION : On compte le nombre de notifications où lue === false
        this.number = this.notifications.filter(n => !n.lue).length;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  marquerCommeLue(notif: Notification): void {
    if (notif.lue) return; // sécurité

    this.notificationService.marquerCommeLue(notif.id).subscribe({
      next: () => {
        notif.lue = true;

        // éviter valeurs négatives
        if (this.number > 0) {
          this.number--;
          this.animateBadge = true;
          setTimeout(() => this.animateBadge = false, 200);

        }
      },
      error: (err) => {
        console.error("Erreur mise à jour notification", err);
      }
    });
  }

}
