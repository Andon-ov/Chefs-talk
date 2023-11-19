import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  @Output() registrationComplete = new EventEmitter<boolean>();

  signUpForm: FormGroup;
  additionalSignUpForm: FormGroup;
  timestamp = new Date();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
    });
    this.additionalSignUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      fromRestaurant: ['', Validators.required],

      isActive: [true, Validators.required],
      isAdmin: [true, Validators.required],
      isCook: [true, Validators.required],
      createdOn: [this.timestamp],
      uid: [''],
    });
  }

  async submitSignUpForm() {
    const { email, password, repeatPassword } = this.signUpForm.value;

    if (password !== repeatPassword) {
      // Handle password mismatch
      alert('Password do not match!');
      return;
    }

    // Register user in Firestore Auth
    try {
      const userCredential =
        await this.authService.CreateUserWithEmailAndPassword(email, password);

      if (userCredential && userCredential.user) {
        const uid = userCredential.user.uid;
        this.additionalSignUpForm.patchValue({ uid: uid });
        this.submitAdditionalSignUpForm();
      }
    } catch (error) {
      console.error(error);
      // Handle error (e.g., display an alert to the user)
    }
  }

  submitAdditionalSignUpForm() {
    const { firstName, lastName, fromRestaurant } =
      this.additionalSignUpForm.value;
    console.log(firstName, lastName, fromRestaurant);

    this.authService.addAdditionalAuthData(this.additionalSignUpForm.value);
  }

  onSubmit() {
    if (this.additionalSignUpForm.valid) {
      const additionalFormData = this.additionalSignUpForm.value;
      // this.addCategory(categoryData);
      this.additionalSignUpForm.reset();
    } else {
      console.log(this.additionalSignUpForm.errors);
    }
  }
}

// .then((userCredential) => {
//   // Signed up
//   const user = userCredential.user;
//   console.log(user);
//   console.log(user.uid);

//   this.registrationComplete.emit(true);
//   this.router.navigate(['/sign-in']);

//   // ...
// })
// .catch((error) => {
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   alert(errorMessage);
//   this.signUpForm.reset();
//   // ..
// });

// submitHandler(signUpForm: NgForm): void {
//   if (signUpForm.valid) {
//     const value: { email: string; password: string } = signUpForm.value;
//     // this.authService.SignInWithEmailAndPassword(value.email, value.password);
//     signUpForm.reset();
//   }
// }

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
