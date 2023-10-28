// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
// import { Firestore, collection, addDoc } from '@angular/fire/firestore';
// import { Recipe } from 'src/app/interfaces';

// @Component({
//   selector: 'app-recipe-form',
//   templateUrl: './recipe-form.component.html',
//   styleUrls: ['./recipe-form.component.css'],
// })
// export class RecipeFormComponent {
//   recipeForm: FormGroup;
//   firestore: Firestore;

//   constructor(private fb: FormBuilder, firestore: Firestore) {
//     this.firestore = firestore;
//     this.recipeForm = this.fb.group({
//       title: [''],
//       description: [''],
//       food_plate: [''],
//       season: [''],
//       summary: [''],
//       order_index: [0],
//       release_time: [0],
//       serving_value: [0],

//       // Image Recipe - създаваме FormGroup за всеки обект в масива
//       image_recipe: this.fb.array([this.createImageRecipeGroup()]),

//       // Video Recipe - създаваме FormGroup за всеки обект в масива
//       video_recipe: this.fb.array([this.createVideoRecipeGroup()]),

//       // Preparation Method - създаваме FormGroup за всеки обект в масива
//       preparation_method: this.fb.array([this.createPreparationMethodGroup()]),

//       // Allergen - създаваме FormGroup за всеки обект в масива
//       allergen: this.fb.array([this.createAllergenGroup()]),

//       // Ingredients - създаваме FormGroup за всеки обект в масива
//       ingredients: this.fb.array([this.createIngredientsGroup()]),

//       category: this.fb.control(null),
//     });
//   }

//   createImageRecipeGroup() {
//     return this.fb.group({
//       // Добавете контролите на 'image_recipe' тук
//     });
//   }

//   createVideoRecipeGroup() {
//     return this.fb.group({
//       // Добавете контролите на 'video_recipe' тук
//     });
//   }

//   createPreparationMethodGroup() {
//     return this.fb.group({
//       // Добавете контролите на 'preparation_method' тук
//     });
//   }

//   createAllergenGroup() {
//     return this.fb.group({
//       // Добавете контролите на 'allergen' тук
//     });
//   }

//   createIngredientsGroup() {
//     return this.fb.group({
//       // Добавете контролите на 'ingredients' тук
//     });
//   }

//   onSubmit() {
//     if (this.recipeForm.valid) {
//       const recipeData = this.recipeForm.value;
//       this.addRecipe(recipeData);
//       this.recipeForm.reset();
//     }
//   }

//   addRecipe(recipeData: Recipe) {
//     const collectionName = 'Recipe';

//     addDoc(collection(this.firestore, collectionName), recipeData)
//       .then((docRef) => {
//         console.log('Document written with ID: ', docRef.id);
//       })
//       .catch((error) => {
//         console.error('Error adding document: ', error);
//       });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { BaseRecipe, Category, Recipe } from 'src/app/interfaces';
import { CategoriesService } from '../../list-categories/categories.service';
import { BaseRecipeService } from 'src/app/base-recipe/base-recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  firestore: Firestore;

  categories: Category[] | null = null;
  baseRecipes: BaseRecipe[] | null = null;

  // videoRecipeControl: FormArray<any> = new FormArray([]);
  // videoRecipeControl: FormArray = new FormArray([]);

  constructor(
    private fb: FormBuilder,
    firestore: Firestore,
    private categoriesService: CategoriesService,
    private baseRecipeService: BaseRecipeService
  ) {
    this.firestore = firestore;

    this.recipeForm = this.fb.group({
      title: [''],
      description: [''],
      food_plate: [''],
      season: [''],
      summary: [''],
      order_index: [0],
      release_time: [0],
      serving_value: [0],

      image_recipe: this.fb.array([]),
      video_recipe: this.fb.array([]),
      preparation_method: this.fb.array([]),
      allergen: this.fb.array([]),

      ingredients: this.fb.group([
        {
          amount: [0],
          base: this.fb.control(null),
          name: [''],
          order_index: [0],
          preparation_method: this.fb.array([]),
          quantity: [0],
          unit: [''],
        },
      ]),
      category: this.fb.control(null),
    });
  }

  ngOnInit(): void {
    this.getCategory();
    this.getBaseRecipe();
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

  onSubmit() {
    if (this.recipeForm.valid) {
      const recipeData = this.recipeForm.value;
      this.addRecipe(recipeData);
      this.recipeForm.reset();
    }
  }

  addRecipe(recipeData: Recipe) {
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
