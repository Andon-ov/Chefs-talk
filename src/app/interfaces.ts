import { DocumentData, DocumentReference } from '@angular/fire/firestore';


export interface Category {
  image: string;
  is_active: boolean;
  menu: string;
  name: string;
  note: string;
  order_index: number;
  id:string
}

export interface Recipe {
  allergen: string[];
  category: DocumentReference<DocumentData>;
  description: string;
  food_plate: string;
  image_recipe: string[];
  ingredients: Ingredient[];
  order_index: number;
  preparation_method: string[];
  release_time: number;
  season: string;
  serving_value: number;
  summary: string;
  title: string;
  video_recipe: string[];
  id:string
}

export interface Ingredient {
  amount: number;
  base: DocumentReference<DocumentData>;
  order_index: number;
  preparation_method: string[];
  product: DocumentReference<DocumentData>;
  quantity: number;
  recipe:DocumentReference<DocumentData>
  unit: DocumentReference<DocumentData>;
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

