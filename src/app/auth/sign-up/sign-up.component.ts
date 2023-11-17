import { Component } from '@angular/core';


import { AuthService } from 'src/app/shared/auth.services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(private authService: AuthService) {}

  submitHandler(signUpForm: NgForm): void {
    if (signUpForm.valid) {
      const value: { email: string; password: string } = signUpForm.value;
      // this.authService.SignInWithEmailAndPassword(value.email, value.password);
      signUpForm.reset();
    }
  }
}