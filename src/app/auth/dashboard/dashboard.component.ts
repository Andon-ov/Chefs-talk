import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userData$.subscribe((userData) => {
      this.user = userData;
    });
  }
}
