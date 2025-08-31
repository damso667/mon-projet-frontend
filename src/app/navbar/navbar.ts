import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Medecin,Notification} from '../services/medecin';

@Component({
  selector: 'app-navbar',
  imports: [NgIf,RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  role: 'ROLE_MEDECIN' | 'ROLE_TECHNITIEN' | 'ROLE_SECRETAIRE' | null = null;

  constructor(private auth: Auth, private router: Router,private notificationService: Medecin) {
    this.role = this.auth.getRole?.() as 'ROLE_MEDECIN' | 'ROLE_TECHNITIEN' | 'ROLE_SECRETAIRE' | null ; // méthode que tu avais pour récupérer le rôle
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
    notifications: Notification[] = [];
    loading = false;
    number: number= 0;



    ngOnInit(): void {
      this.fetchNotifications();
    }

    fetchNotifications(): void {
      this.loading = true;
      this.notificationService.getNotifications().subscribe({
        next: (data) => {
          this.notifications = data;
          this.loading = false;
          this.number++
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }

    marquerCommeLue(notif: Notification): void {
      this.notificationService.marquerCommeLue(notif.id).subscribe({
        next: () => {
          notif.lue = true; // mise à jour locale pour éviter de recharger
          this.number--
        },
        error: (err) => console.error("Erreur maj notification", err)
      });
    }
}
