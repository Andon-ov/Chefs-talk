import { Component } from '@angular/core';
import { inject } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  CollectionReference,
  DocumentData,
  query,
} from '@angular/fire/firestore';

interface Recipe {
  allergen: CollectionReference<DocumentData>;
  category: CollectionReference<DocumentData>;
  description: string;
  foodPlate: CollectionReference<DocumentData>;
  imageRecipe: string;
  ingredients: CollectionReference<DocumentData>;
  orderIndex: number;
  preparationMethod: string;
  releaseTime: number;
  season: string;
  servingValue: number;
  summary: string;
  title: string;
  videoRecipe: string;
}

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent {
  items: any[] = [];
  firestore: Firestore = inject(Firestore);

  constructor() {
    
    // Allergen
    const allergens = query(collection(this.firestore, 'Allergen'));
    
    async function allergen() {
      const querySnapshot = await getDocs(allergens);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
      });
    }
    allergen();
    
    
    // FoodPlate
    const foodPlates = query(collection(this.firestore, 'FoodPlate'));
    
    async function foodPlate() {
      const querySnapshot = await getDocs(foodPlates);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
      });
    }
    foodPlate();
    
    
    // Recipe
    const collectionName = 'Recipe';
    const collectionRef = collection(this.firestore, collectionName);

    getDocs(collectionRef)
      .then(async (querySnapshot) => {
        for (const doc of querySnapshot.docs) {
          const data = doc.data() as any;
          this.items.push(data);
        }
      })
      .catch((error) => {
        console.error('Error getting documents: ', error);
      });



      
  }
}


// https://firebase.google.com/docs/firestore/query-data/get-data