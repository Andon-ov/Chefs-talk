import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  CollectionReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BaseRecipe, Category, Plates } from '../interfaces';
import { BaseRecipeService } from '../base-recipe/base-recipe.service';
import { CategoriesService } from '../list-categories/categories.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  testForm: FormGroup;
  firestore: Firestore;
  allergens: Allergens[] = [];
  plates: Plates[] = [];
  baseRecipes: BaseRecipe[] = [];
  categories: Category[] = []
  currentOrderIndex = 1;
  isBaseControl: any;

  constructor(
    firestore: Firestore,
    private fb: FormBuilder,
    private baseRecipeService: BaseRecipeService,
    private categoriesService: CategoriesService
  ) {
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
      // recipe
      title: '',
      category: this.fb.control(null),

      description: '',
      summary: '',
      season: '',
      order_index: [0],
      release_time: [0],
      serving_value: [0],

      selectedAllergen: null,
      allergens: this.fb.array([]),
      selectedAllergenNames: '',

      food_plate: this.fb.control(null),
      image_recipe: this.fb.array([]),
      video_recipe: this.fb.array([]),
      preparation_method: this.fb.array([]),

      ingredients: this.fb.array([
        this.fb.group({
          name: '',
          amount: null,

          base: this.fb.control(null),
          is_base: false, // if base true

          order_index: [0],
          preparation_method: '',
          quantity: [0],
          unit: '',
        }),
      ]),
    });

    this.getAllergens().subscribe((data) => {
      this.allergens = data;
    });

    this.getPlates().subscribe((data) => {
      this.plates = data;
      console.log(this.plates);
      
    });
  }

  ngOnInit(): void {
    this.getBaseRecipe();
    this.getCategory()
    
  }

  // image
  addImage() {
    const imageArray = this.testForm.get('image_recipe') as FormArray;
    imageArray.push(
      this.fb.group({
        image_recipe: '',
      })
    );
  }
  removeImage(index: number) {
    const imageArray = this.testForm.get('image_recipe') as FormArray;
    imageArray.removeAt(index);
  }

  // video
  addVideo() {
    const videoArray = this.testForm.get('video_recipe') as FormArray;
    videoArray.push(
      this.fb.group({
        video_recipe: '',
      })
    );
  }
  removeVideo(index: number) {
    const videoArray = this.testForm.get('video_recipe') as FormArray;
    videoArray.removeAt(index);
  }

  // preparation
  addPreparation() {
    const preparationArray = this.testForm.get(
      'preparation_method'
    ) as FormArray;
    preparationArray.push(
      this.fb.group({
        preparation_method: '',
      })
    );
  }
  removePreparation(index: number) {
    const preparationArray = this.testForm.get(
      'preparation_method'
    ) as FormArray;
    preparationArray.removeAt(index);
  }

  addIngredient() {
    const ingredientsArray = this.testForm.get('ingredients') as FormArray;
    ingredientsArray.push(
      this.fb.group({
        name: '',
        amount: null,

        base: this.fb.control(null),
        is_base: false, // if base true

        order_index: this.currentOrderIndex,
        quantity: [0],
        preparation_method: '',
        unit: '',
      })
    );
    this.currentOrderIndex++;
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
    const selectedAllergen = this.allergens.find(
      (a) => a.id === selectedAllergenId
    );
    if (selectedAllergen) {
      selectedAllergenNames?.setValue(
        selectedAllergenNames.value
          ? selectedAllergenNames.value + ', ' + selectedAllergen.name
          : selectedAllergen.name
      );

      // this.testForm.removeControl('selectedAllergen'); 
      // Remove selectedAllergen from form
    }
  }

  onIsBaseChange() {
    const ingredientsArray = this.testForm.get('ingredients') as FormArray;
    this.isBaseControl = ingredientsArray.value[0].is_base;
  }
  // onIsBaseChange(index: number) {
  //   const ingredientsArray = this.testForm.get('ingredients') as FormArray;
  //   this.isBaseControl = ingredientsArray.at(index).get('is_base')?.value;
  // }

  get ingredients() {
    return this.testForm.get('ingredients') as FormArray;
  }

  get image_recipe() {
    return this.testForm.get('image_recipe') as FormArray;
  }

  get video_recipe() {
    return this.testForm.get('video_recipe') as FormArray;
  }
  get preparation_method() {
    return this.testForm.get('preparation_method') as FormArray;
  }

  onSubmit() {
    if (this.testForm.valid) {
      const testData = this.testForm.value;
      this.addTest(testData);
      this.testForm.reset();
    }
  }

  getCategory(): void {
    this.categoriesService.getCategories().subscribe({
      next: (category) => {
        this.categories = category;
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
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

  getPlates(): Observable<Plates[]> {
    const collectionName = 'Plates';
    const collectionRef: CollectionReference = collection(
      this.firestore,
      collectionName
    );

    return new Observable((observer) => {
      getDocs(collectionRef)
        .then((querySnapshot) => {
          
          const data: Plates[] = [];

          querySnapshot.forEach((doc) => {
            const platesData = doc.data() as any;

            const platesWithId = { ...platesData, id: doc.id };

            data.push(platesWithId);
          });
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  

  getBaseRecipe(): void {
    this.baseRecipeService.getBaseRecipe().subscribe({
      next: (baseRecipes) => {
        this.baseRecipes = baseRecipes;
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
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
