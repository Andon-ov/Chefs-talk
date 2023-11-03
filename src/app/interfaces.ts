import { DocumentData, DocumentReference } from '@angular/fire/firestore';

export interface Category {
  image: string;
  is_active: boolean;
  menu: string;
  name: string;
  note: string;
  order_index: number;
  id: string;
}

export interface Recipe {
  allergen: DocumentReference<DocumentData>[];
  category: DocumentReference<DocumentData>;
  description: string;
  food_plate: DocumentReference<DocumentData>;
  id: string;
  ingredients: Ingredient[];
  order_index: number;
  preparation_method: string[];
  release_time: number;
  season: string;
  serving_value: number;
  
  selectedAllergen: string;
  selectedAllergenNames: string;
  summary: string;
  title: string;
  image_recipe: ImageRecipeItem[];
  video_recipe: string[];
}
// export interface Recipe {
//   allergen: string[];
//   category: DocumentReference<DocumentData>;
//   description: string;
//   food_plate: string;
//   id: string;
//   image_recipe: string[];
//   ingredients: Ingredient[];
//   order_index: number;
//   preparation_method: string[];
//   release_time: number;
//   season: string;
//   serving_value: number;

//   summary: string;
//   title: string;
//   video_recipe: string[];
// }

export interface Ingredient {
  amount: number;
  base: DocumentReference<DocumentData>;
  order_index: number;
  preparation_method: string;
  name: string;
  quantity: number;
  is_base: boolean;
  unit: string;
}

export interface BaseRecipe {
  base_recipe_portions: number;
  base_type: string;
  base_yield: number;
  
  allergen: DocumentReference<DocumentData>[];
  summary: string;
  preparation_method: string[];
  title: string;
  id: string;
  description: string;
  ingredients: Ingredient[];
  image_recipe: string[];
  video_recipe: string[];
}

export interface Allergens {
  id: string;
  name: string;
}

export interface Plates {
  name: string;
  id: string;
}


export interface ImageRecipeItem {
  image_recipe: string;
}