import { DocumentData, DocumentReference } from '@angular/fire/firestore';

export interface Recipe {
  allergen: DocumentReference<DocumentData>[];
  category: DocumentReference<DocumentData>;
  description: string;
  food_plate: DocumentReference<DocumentData>;
  image_recipe: string;
  ingredients: DocumentReference<DocumentData>[];
  order_index: number;
  preparation_method: string;
  release_time: number;
  season: string;
  serving_value: number;
  summary: string;
  title: string;
  video_recipe: string;
}

export interface Allergen {
  title: string;
}

export interface Category {
  image: string;
  is_active: boolean;
  menu: string;
  name: string;
  note: string;
  order_index: number;
  id:string
}

export interface Ingredients {
  amount: number;
  base: DocumentReference<DocumentData>;
  food: DocumentReference<DocumentData>;
  order_index: number;
  preparation_method: DocumentReference<DocumentData>;
  quantity: number;
  recipe: DocumentReference<DocumentData>;
  unit: DocumentReference<DocumentData>;
}

export interface FoodPlate {
  name: string;
}

export interface BaseRecipe {
  allergen: DocumentReference<DocumentData>[];
  base_recipe_portions: number;
  base_type: string;
  base_yield: number;
  note: string;
  preparation: string;
  preparation_method: string[];
  title: string;
}

export interface Food {
  detail: string;
  name: string;
}
