// sign-up.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      fromRestaurant: ['', Validators.required],
      isActive: [true, Validators.required],
      isAdmin: [false, Validators.required],
      isCook: [true, Validators.required],
    });
  }

  async submitSignUpForm() {
    if (this.signUpForm.valid) {
      const { email, password, repeatPassword, ...additionalAuthData } =
        this.signUpForm.value;

      if (password !== repeatPassword) {
        alert('Password do not match!');
        return;
      }

      try {
        await this.authService.registerUser(
          email,
          password,
          additionalAuthData
        );
      } catch (error) {
        alert(error);
      }
    }
  }
}
