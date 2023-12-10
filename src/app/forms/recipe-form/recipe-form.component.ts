import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { BaseRecipeService } from 'src/app/shared/base-recipe.services/base-recipe.service';
import { CategoriesService } from 'src/app/shared/categories.services/categories.service';
import {
  Allergens,
  BaseRecipe,
  Category,
  Plates,
} from 'src/app/shared/interfaces/interfaces';
import { AllergensService } from 'src/app/shared/allergens.services/allergens.service';
import { PlatesService } from 'src/app/shared/plates.services/plates.service';
import { FormErrorCheckService } from 'src/app/shared/form-error-check.service/form-error-check.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  firestore: Firestore;
  allergens: Allergens[] = [];
  plates: Plates[] = [];
  baseRecipes: BaseRecipe[] = [];
  categories: Category[] = [];
  currentOrderIndex = 1;
  isBaseControl: any;

  constructor(
    firestore: Firestore,
    private fb: FormBuilder,
    private baseRecipeService: BaseRecipeService,
    private categoriesService: CategoriesService,
    private allergenService: AllergensService,
    private platesService: PlatesService,
    private formErrorCheckService: FormErrorCheckService
  ) {
    this.firestore = firestore;

    this.recipeForm = this.fb.group({
      title: ['', [Validators.required]],
      category: this.fb.control([null, [Validators.required]]),

      description: ['', [Validators.required]],
      season: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      summary: [''],

      release_time: [0],
      serving_value: [0],
      order_index: [0],

      allergens: this.fb.array([]),

      food_plate: this.fb.control([null, [Validators.required]]),

      image_recipe: this.fb.array([]),
      video_recipe: this.fb.array([]),
      preparation_method: this.fb.array([]),

      ingredients: this.fb.array([
        this.fb.group({
          name: ['', [Validators.required]],
          amount: [null, [Validators.required]],
          base: this.fb.control(null),
          unit: ['', [Validators.required]],
          order_index: [0],
          preparation_method: [''],
          quantity: [0],
        }),
      ]),
    });

    this.getAllergens();
    // .subscribe((data) => {
    //   this.allergens = data;
    // });

    this.getPlates();
    // .subscribe((data) => {
    //   this.plates = data;
    // });
  }

  ngOnInit(): void {
    this.getBaseRecipe();
    this.getCategory();
  }

  // image
  addImage() {
    const imageArray = this.recipeForm.get('image_recipe') as FormArray;
    imageArray.push(
      this.fb.group({
        image_recipe: [],
      })
    );
  }

  removeImage(index: number) {
    const imageArray = this.recipeForm.get('image_recipe') as FormArray;
    imageArray.removeAt(index);
  }

  addImageToForm(imageUrl: string) {
    const imageArray = this.recipeForm.get('image_recipe') as FormArray;
    imageArray.push(
      this.fb.group({
        image_recipe: imageUrl,
      })
    );
  }

  // video
  addVideo() {
    const videoArray = this.recipeForm.get('video_recipe') as FormArray;
    videoArray.push(
      this.fb.group({
        video_recipe: '',
      })
    );
  }
  removeVideo(index: number) {
    const videoArray = this.recipeForm.get('video_recipe') as FormArray;
    videoArray.removeAt(index);
  }

  // preparation
  addPreparation() {
    const preparationArray = this.recipeForm.get(
      'preparation_method'
    ) as FormArray;
    preparationArray.push(
      this.fb.group({
        preparation_method: '',
      })
    );
  }
  removePreparation(index: number) {
    const preparationArray = this.recipeForm.get(
      'preparation_method'
    ) as FormArray;
    preparationArray.removeAt(index);
  }

  addIngredient() {
    const ingredientsArray = this.recipeForm.get('ingredients') as FormArray;
    ingredientsArray.push(
      this.fb.group({
        name: ['', [Validators.required]],
        amount: [null, [Validators.required]],
        base: this.fb.control(null),
        unit: ['', [Validators.required]],
        order_index: this.currentOrderIndex,
        preparation_method: [''],
        quantity: [0],
      })
    );
    this.currentOrderIndex++;
  }

  // addReferenceToSelectedAllergen(event: any) {
  //   const selectedAllergenId = event.target.value;
  //   const allergensArray = this.recipeForm.get('allergens') as FormArray;
  //   allergensArray.push(this.fb.control(selectedAllergenId));
  // }

  // addSelectedAllergen() {
  //   const selectedAllergenId = this.recipeForm.get('selectedAllergen')?.value;
  //   const allergensArray = this.recipeForm.get('allergens') as FormArray;
  //   allergensArray.push(this.fb.control(selectedAllergenId));

  //   const selectedAllergenNames = this.recipeForm.get('selectedAllergenNames');
  //   const selectedAllergen = this.allergens.find(
  //     (a) => a.id === selectedAllergenId
  //   );
  //   if (selectedAllergen) {
  //     selectedAllergenNames?.setValue(
  //       selectedAllergenNames.value
  //         ? selectedAllergenNames.value + ', ' + selectedAllergen.name
  //         : selectedAllergen.name
  //     );
  //   }
  // }

  isAllergenSelected(allergenId: string): boolean {
    return this.added_allergens.value.some(
      (addedAllergenId: string) => addedAllergenId === allergenId
    );
  }

  toggleAllergenSelection(allergenId: string): void {
    const index = this.added_allergens.value.indexOf(allergenId);

    if (index === -1) {
      this.added_allergens.push(new FormControl(allergenId));
    } else {
      this.added_allergens.removeAt(index);
    }
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get image_recipe() {
    return this.recipeForm.get('image_recipe') as FormArray;
  }

  get video_recipe() {
    return this.recipeForm.get('video_recipe') as FormArray;
  }
  get preparation_method() {
    return this.recipeForm.get('preparation_method') as FormArray;
  }

  get added_allergens() {
    return this.recipeForm.get('allergens') as FormArray;
  }

  onSubmit() {
    this.formErrorCheckService.markFormGroupTouched(this.recipeForm);
    this.formErrorCheckService.markFormArrayControlsTouched(this.ingredients);

    if (this.recipeForm.invalid) {
      alert(
        'Формата не е валидна. Моля, попълнете всички задължителни полета.'
      );
      return;
    }

    const recipeData = this.recipeForm.value;
    this.addRecipe(recipeData);
    this.recipeForm.reset();
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

  // getAllergens(): Observable<Allergens[]> {
  //   const collectionName = 'Allergens';
  //   const collectionRef: CollectionReference = collection(
  //     this.firestore,
  //     collectionName
  //   );

  //   return new Observable((observer) => {
  //     getDocs(collectionRef)
  //       .then((querySnapshot) => {
  //         const data: Allergens[] = [];

  //         querySnapshot.forEach((doc) => {
  //           const allergensData = doc.data() as any;

  //           const allergensWithId = { ...allergensData, id: doc.id };

  //           data.push(allergensWithId);
  //         });
  //         observer.next(data);
  //         observer.complete();
  //       })
  //       .catch((error) => {
  //         observer.error(error);
  //       });
  //   });
  // }
  getAllergens(): void {
    this.allergenService.getAllergens().subscribe({
      next: (allergens) => {
        this.allergens = allergens;
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
  }

  getPlates(): void {
    this.platesService.getPlates().subscribe({
      next: (plates) => {
        this.plates = plates;
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
  }

  // getPlates(): Observable<Plates[]> {
  //   const collectionName = 'Plates';
  //   const collectionRef: CollectionReference = collection(
  //     this.firestore,
  //     collectionName
  //   );

  //   return new Observable((observer) => {
  //     getDocs(collectionRef)
  //       .then((querySnapshot) => {
  //         const data: Plates[] = [];

  //         querySnapshot.forEach((doc) => {
  //           const platesData = doc.data() as any;

  //           const platesWithId = { ...platesData, id: doc.id };

  //           data.push(platesWithId);
  //         });
  //         observer.next(data);
  //         observer.complete();
  //       })
  //       .catch((error) => {
  //         observer.error(error);
  //       });
  //   });
  // }

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

  addRecipe(recipeData: any) {
    const collectionName = 'Recipe';

    addDoc(collection(this.firestore, collectionName), recipeData)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }
}
