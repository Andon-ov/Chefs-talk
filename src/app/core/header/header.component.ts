import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isMenuOpen = false;
  constructor(private authService: AuthService){}
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  
  logout(){
    this.authService.SignOutAuth()
  }

  // handleMenuItemClick(item: string) {
  //   console.log('Clicked on ' + item);
  //   this.closeMenu();
  // }
}
