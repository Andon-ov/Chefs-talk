import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.services/auth.service';
import { FirestoreUser } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  user: any;
  constructor(private authService: AuthService) {
    authService.userData$.subscribe({
      next: (value) => {
        this.user = value;
      },
      error: (err) => {
      },
    });
  }
}
