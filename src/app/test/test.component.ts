import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  CollectionReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  testForm: FormGroup;
  firestore: Firestore;
  allergens: Allergens[] = [];

  constructor(private fb: FormBuilder, firestore: Firestore) {
    this.firestore = firestore;
      // adding only one reference to object 
    // this.testForm = this.fb.group({
    //   title: '',
    //   allergens: this.fb.array([]),
    //   ingredients: this.fb.array([
    //     this.fb.group({
    //       name: '',
    //       amount: null,
    //     }),
    //   ]),
    // });

    // adding reference to object in array
    // this.testForm = this.fb.group({
    //   title: '',
    //   selectedAllergen: null,
    //   allergens: this.fb.array([]),
    //   ingredients: this.fb.array([
    //     this.fb.group({
    //       name: '',
    //       amount: null,
    //     }),
    //   ]),
    // });


    this.testForm = this.fb.group({
      title: '',
      selectedAllergen: null,
      allergens: this.fb.array([]),
      selectedAllergenNames: '', 
      ingredients: this.fb.array([
        this.fb.group({
          name: '',
          amount: null,
        }),
      ]),
    });

    this.getAllergens().subscribe((data) => {
      this.allergens = data;
    });
  }

  ngOnInit() {
    this.addIngredient();
  }

  addIngredient() {
    const ingredientsArray = this.testForm.get('ingredients') as FormArray;
    ingredientsArray.push(
      this.fb.group({
        name: '',
        amount: null,
      })
    );
  }

  addReferenceToSelectedAllergen(event: any) {
    const selectedAllergenId = event.target.value;
    const allergensArray = this.testForm.get('allergens') as FormArray;
    allergensArray.push(this.fb.control(selectedAllergenId));
  }

  // adding reference to object in array
  // addSelectedAllergen() {
  //   const selectedAllergenId = this.testForm.get('selectedAllergen')?.value;
  //   const allergensArray = this.testForm.get('allergens') as FormArray;
  //   allergensArray.push(this.fb.control(selectedAllergenId));
  // }

  addSelectedAllergen() {
    const selectedAllergenId = this.testForm.get('selectedAllergen')?.value;
    const allergensArray = this.testForm.get('allergens') as FormArray;
    allergensArray.push(this.fb.control(selectedAllergenId));
  
    const selectedAllergenNames = this.testForm.get('selectedAllergenNames');
    const selectedAllergen = this.allergens.find((a) => a.id === selectedAllergenId);
    if (selectedAllergen) {
      selectedAllergenNames?.setValue(
        selectedAllergenNames.value
          ? selectedAllergenNames.value + ', ' + selectedAllergen.name
          : selectedAllergen.name
      );
  
      this.testForm.removeControl('selectedAllergen'); // Remove selectedAllergen from form
    }
  }
  

  get ingredients() {
    return this.testForm.get('ingredients') as FormArray;
  }

  onSubmit() {
    if (this.testForm.valid) {
      const testData = this.testForm.value;
      this.addTest(testData);
      this.testForm.reset();
    }
  }

  getAllergens(): Observable<Allergens[]> {
    const collectionName = 'Allergens';
    const collectionRef: CollectionReference = collection(
      this.firestore,
      collectionName
    );

    return new Observable((observer) => {
      getDocs(collectionRef)
        .then((querySnapshot) => {
          const data: Allergens[] = [];

          querySnapshot.forEach((doc) => {
            const allergensData = doc.data() as any;

            const allergensWithId = { ...allergensData, id: doc.id };

            data.push(allergensWithId);
          });
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  addTest(testData: any) {
    const collectionName = 'test';

    addDoc(collection(this.firestore, collectionName), testData)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }
}

interface Allergens {
  id: string;
  name: string;
}
