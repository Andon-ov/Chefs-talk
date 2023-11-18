import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Category } from 'src/app/shared/interfaces/interfaces';
import { EventEmitter, Output } from '@angular/core';

import { AuthService } from 'src/app/shared/auth.services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  @Output() registrationComplete = new EventEmitter<boolean>();

  signUpForm: FormGroup;
  // firestore: Firestore;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
    });
  }

  submitSignUpForm() {
    const { email, password, repeatPassword } = this.signUpForm.value;

    if (password !== repeatPassword) {
      // Handle password mismatch
      alert('Password do not match!');
      return;
    }

    // Register user in Firestore Auth

    this.authService
      .CreateUserWithEmailAndPassword(email, password)
      .then(() => {
        // Notify parent component that registration is complete
        this.registrationComplete.emit(true);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  }

  submitHandler(signUpForm: NgForm): void {
    if (signUpForm.valid) {
      const value: { email: string; password: string } = signUpForm.value;
      // this.authService.SignInWithEmailAndPassword(value.email, value.password);
      signUpForm.reset();
    }
  }
}

//   constructor(private fb: FormBuilder, firestore: Firestore) {
//     this.firestore = firestore;
//     this.categoryForm = this.fb.group({
//       name: ['', [Validators.required]],
//       is_active: [false],
//       menu: ['', [Validators.required]],
//       order_index: [0],
//       note: [''],
//       image: [''],
//     });
//   }

//   onSubmit() {
//     if (this.categoryForm.valid) {
//       const categoryData = this.categoryForm.value;
//       this.addCategory(categoryData);
//       this.categoryForm.reset();
//     }else{
//       console.log(this.categoryForm.errors);

//     }
//   }

//   removeImage() {
//     const imageControl = this.categoryForm.get('image');
//     imageControl?.setValue('');
//   }

//   addImageToForm(imageUrl: string) {
//     const imageControl = this.categoryForm.get('image');
//     imageControl?.setValue(imageUrl);
//   }

//   get image() {
//     return this.categoryForm.get('image');
//   }

//   addCategory(categoryData: Category) {
//     const collectionName = 'Category';

//     addDoc(collection(this.firestore, collectionName), categoryData)
//       .then((docRef) => {
//         console.log('Document written with ID: ', docRef.id);
//       })
//       .catch((error) => {
//         console.error('Error adding document: ', error);
//       });
//   }
// }
