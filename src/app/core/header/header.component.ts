import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  userData: any | null = null;
  private userDataSubject: BehaviorSubject<any | null> = new BehaviorSubject<
    any | null
  >(null);
  private userDataSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.userDataSubscription = this.userDataSubject.subscribe((value) => {
      this.userData = value;
    });
  }

  ngOnInit(): void {
    this.authService.userData$.subscribe({
      next: (value) => {
        if (value) {
          this.userDataSubject.next(value);
          console.log('Имате потребител:', value);
        } else {
          this.userDataSubject.next(null);
          console.log('Нямате потребител.');
        }
      },
      error: (err) => {},
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logout() {
    this.authService.logoutUser();
  }
}
