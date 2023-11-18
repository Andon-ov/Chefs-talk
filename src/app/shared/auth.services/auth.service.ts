import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(public router: Router) {}

  SignInWithEmailAndPassword(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')!);
          this.router.navigate(['home']);
          console.log(this.userData);
        } else {
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error (${errorCode}): ${errorMessage}`);
      });
  }

  CreateUserWithEmailAndPassword(email: string, password: string) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  SignOutAuth() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['sign-in']);
        console.log(this.userData);

        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }
  public getUser(): string {
    return this.userData;
  }
}
