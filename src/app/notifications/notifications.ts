import { Component } from '@angular/core';
import { Medecin , Notification} from '../services/medecin';
import { NgIf, NgForOf, NgClass, DatePipe } from '@angular/common';

@Component({
  selector: 'app-notifications',
  imports: [NgIf,NgForOf,NgClass,DatePipe],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css'
})
export class Notifications {

  notifications: Notification[] = [];
  loading = false;

  constructor(private notificationService: Medecin) {}

  ngOnInit(): void {
    this.fetchNotifications();
  }

  fetchNotifications(): void {
    this.loading = true;
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        this.loading = false;
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
      },
      error: (err) => console.error("Erreur maj notification", err)
    });
  }
}
