import {
  DocumentData,
  DocumentReference,
  Timestamp,
} from '@angular/fire/firestore';

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
  allergens: DocumentReference<DocumentData>[];
  category: DocumentReference<DocumentData>;
  description: string;
  food_plate: DocumentReference<DocumentData>;
  id: string;
  ingredients: Ingredient[];
  order_index: number;
  preparation_method: PreparationMethodItem[];
  release_time: number;
  season: string;
  serving_value: number;
  unit: string;

  selectedAllergen: string;
  selectedAllergenNames: string;
  summary: string;
  title: string;
  image_recipe: ImageRecipeItem[];
  video_recipe: VideoRecipeItem[];
}

export interface Ingredient {
  amount: number;
  base: DocumentReference<DocumentData>;
  order_index: number;
  preparation_method: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface BaseRecipe {
  base_recipe_portions: number;
  base_type: string;
  base_yield: number;
  allergens: DocumentReference<DocumentData>[];
  // allergens: Allergens[];

  selectedAllergen: string;
  selectedAllergenNames: string;
  summary: string;
  unit: string;
  preparation_method: PreparationMethodItem[];
  title: string;
  id: string;
  description: string;
  ingredients: Ingredient[];
  image_recipe: ImageRecipeItem[];
  video_recipe: VideoRecipeItem[];
}

export interface Allergens {
  id: string;
  name: string;
}

export interface Plates {
  id: string;
  name: string;
}

export interface ImageRecipeItem {
  image_recipe: string;
}

export interface VideoRecipeItem {
  video_recipe: string;
}

export interface PreparationMethodItem {
  preparation_method: string;
}

export interface Comments {
  create_time: Timestamp;
  name: string;
  recipeId: string;
  text: string;
  uid:string;
  id:string;
}
export interface FirestoreUser {
  accessToken: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: UserMetadata;
  phoneNumber: string;
  photoURL: string;
  uid: string;
  firstName: string;
  lastName: string;
  fromRestaurant: string;
  isActive: boolean;
  isAdmin: boolean;
  isCook: boolean;
}

interface UserMetadata {
  createdAt: string;
  creationTime: string;
  lastLoginAt: string;
  lastSignInTime: string;
}
