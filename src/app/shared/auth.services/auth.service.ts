import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';

import { Firestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { AdditionalAuthData } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userDataSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  userData$: Observable<User | null> = this.userDataSubject.asObservable();

  constructor(private firestore: Firestore, public router: Router) {}

  async SignInWithEmailAndPassword(email: string, password: string) {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const additionalAuthDataUid = user.uid;
      const additionalAuthData = await this.getAdditionalAuthDataById(
        additionalAuthDataUid
      );
      const fullAuthData = { ...user, ...additionalAuthData };

      if (fullAuthData) {
        localStorage.setItem('user', JSON.stringify(fullAuthData));
        JSON.parse(localStorage.getItem('user')!);
        this.userDataSubject.next(fullAuthData);
        this.router.navigate(['home']);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    } catch (error) {
      if (error instanceof Error) {
        const errorCode = (error as Error).name;
        const errorMessage = (error as Error).message;
        console.error(`Error (${errorCode}): ${errorMessage}`);
      } else {
        console.error('Unknown error:', error);
      }
    }
  }

  CreateUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserCredential> {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async SignOutAuth() {
    try {
      const auth = getAuth();
      await signOut(auth);
  
      localStorage.removeItem('user');
      this.userDataSubject.next(null);
      this.router.navigate(['sign-in']);
    } catch (error) {
      console.error(error);
    }
  }
  

  public getUser(): string {
    return JSON.parse(localStorage.getItem('user')!);
  }

  addAdditionalAuthData(additionalAuthData: AdditionalAuthData) {
    const collectionName = 'Auth';
    const userId = additionalAuthData.uid;
    console.log(userId);

    setDoc(doc(this.firestore, collectionName, userId), additionalAuthData)
      .then(() => {
        console.log('Document written with ID: ', userId);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }

  async getAdditionalAuthDataById(
    additionalAuthDataId: string
  ): Promise<AdditionalAuthData | null> {
    const authDocRef = doc(this.firestore, 'Auth', additionalAuthDataId);
    const authSnapshot = await getDoc(authDocRef);

    if (authSnapshot.exists()) {
      return authSnapshot.data() as AdditionalAuthData;
    } else {
      return null;
    }
  }
}
