import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/shared/auth.services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  signInForm: FormGroup;
  loginError: string | null = null;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async submitSignInForm() {
    if (this.signInForm.valid) {
      const {email, password} = this.signInForm.value;

      try {
        await this.authService.loginUser(email, password);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
