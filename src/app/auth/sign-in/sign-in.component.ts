import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  constructor(private authService: AuthService) {}

  submitHandler(loginForm: NgForm): void {
    if (loginForm.valid) {
      const value: { email: string; password: string } = loginForm.value;
      this.authService.SignInWithEmailAndPassword(value.email, value.password);
      loginForm.reset();
    }
  }
}
