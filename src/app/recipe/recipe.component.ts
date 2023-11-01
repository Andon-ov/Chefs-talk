// import { Component } from '@angular/core';
// import { inject } from '@angular/core';
// import {
//   Firestore,
//   collection,
//   getDocs,

// } from '@angular/fire/firestore';
// import {
//   Recipe,
// } from '../interfaces';

// @Component({
//   selector: 'app-recipe',
//   templateUrl: './recipe.component.html',
//   styleUrls: ['./recipe.component.css'],
// })
// export class RecipeComponent {
//   items: Recipe[] = [];

//   firestore: Firestore = inject(Firestore);

//   constructor() {
//     // Recipe
//     const collectionName = 'Recipe';
//     const collectionRef = collection(this.firestore, collectionName);

//     getDocs(collectionRef)
//       .then(async (querySnapshot) => {
//         for (const doc of querySnapshot.docs) {
//           const data = doc.data() as Recipe;

//           this.items.push(data);
//           console.log(data);

//         }
//       })
//       .catch((error) => {
//         console.error('Error getting documents: ', error);
//       });
//   }
// }

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../interfaces';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent {
  recipe: Recipe | undefined |null;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    this.route.paramMap.subscribe(async (params) => {
      const recipeId = params.get('id');

      if (recipeId) {
        try {
          const recipe = await this.recipeService.getRecipeById(recipeId);
          this.recipe = recipe;
          console.log(recipe);
          

          if (!recipe) {
            console.error('Рецептата не е намерена.');
          }
        } catch (error) {
          console.error('Възникна грешка при извличането на рецептата:', error);
        }
      } else {
        console.error('ID на рецептата не е предоставен.');
      }
    });
  }
}



// //! Get Allergen
// const allergenReferenceArray = data.allergen;

// if (allergenReferenceArray && Array.isArray(allergenReferenceArray)) {
//   for (const reference of allergenReferenceArray) {
//     const allergenPromise = await getDoc(reference);
//     const allergenRef = await getDoc(allergenPromise.ref);
//     const allergenData = allergenRef.data() as Allergen;

//     if (allergenData) {
//       const allergenTitle = allergenData.title;
//     }
//   }
// } else {
//   console.log('Листът с референции е празен или липсва.');
// }
// //* Get Allergen End

// //! Get Category
// const categoryPromise = await getDoc(data.category);
// const categoryRef = await getDoc(categoryPromise.ref);

// const categoryData = categoryRef.data() as Category;

// if (categoryData) {
//   const categoryName = categoryData.name;
//   const categoryImage = categoryData.image;
//   const isCategoryActive = categoryData.is_active;
//   const menuType = categoryData.menu;
//   const orderIndex = categoryData.order_index;
//   const categoryNote = categoryData.note;
// }
// //* Get Category end

// //! Get FoodPlate

// const foodPlatePromise = await getDoc(data.food_plate);
// const foodPlateRef = await getDoc(foodPlatePromise.ref);
// const foodPlateData = foodPlateRef.data() as FoodPlate;

// if (foodPlateData) {
//   const foodPlateName = foodPlateData.name;
// }

// //* Get foodPlate End

//! Recipe End Start Ingredients

// //! Get Ingredients
// const ingredientsReferenceArray = data.ingredients;

// if (
//   ingredientsReferenceArray &&
//   Array.isArray(ingredientsReferenceArray)
// ) {
//   for (const reference of ingredientsReferenceArray) {
//     const ingredientsPromise = await getDoc(reference);
//     const ingredientsRef = await getDoc(ingredientsPromise.ref);
//     const ingredientsData = ingredientsRef.data() as Ingredients;

//     if (ingredientsData) {
//       const ingredientsOrderIndex = ingredientsData.order_index;
//       const ingredientsAmount = ingredientsData.amount;
//       const ingredientsQuantity = ingredientsData.quantity;
//       const ingredientsPreparationMethod =
//         ingredientsData.preparation_method;
//       const ingredientsRecipe = ingredientsData.recipe; //link - i`m in recipe

//       const ingredientsBase = ingredientsData.base;

//       //! Get ingredientsBase == BaseRecipe

//       const baseRecipePromise = await getDoc(ingredientsBase);
//       const baseRecipeRef = await getDoc(baseRecipePromise.ref);
//       const baseRecipeData = baseRecipeRef.data() as BaseRecipe;

//       if (baseRecipeData) {
//         const baseRecipeAllergen = baseRecipeData.allergen; // link
//         const baseRecipePortions =
//           baseRecipeData.base_recipe_portions;
//         const baseRecipeType = baseRecipeData.base_type;
//         const baseRecipeYield = baseRecipeData.base_yield;
//         const baseRecipeNote = baseRecipeData.note;
//         const baseRecipePreparation = baseRecipeData.preparation;
//         const baseRecipePreparationMethod =
//           baseRecipeData.preparation_method; // array
//         const baseRecipeTitle = baseRecipeData.title;
//       }

//       //* Get ingredientsBase End

//       const ingredientsFood = ingredientsData.food;

//       //! Get ingredientsFood

//       const foodPromise = await getDoc(ingredientsFood);
//       const foodRef = await getDoc(foodPromise.ref);
//       const foodData = foodRef.data() as Food;

//       if (foodData) {
//         const foodName = foodData.name;
//         const foodDetail = foodData.detail;
//       }

//       //* Get ingredientsFood End

//       const ingredientsUnit = ingredientsData.unit;
//       //! Get ingredientsUnit

//       const unitPromise = await getDoc(ingredientsUnit);
//       const unitRef = await getDoc(unitPromise.ref);
//       const unitData = unitRef.data() as any;

//       if (unitData) {
//         const unitName = unitData.name;
//       }

//       //* Get ingredientsUnit End
//     }
//   }
// } else {
//   console.log('Листът с референции е празен или липсва.');
// }
// //* Get Ingredients End
