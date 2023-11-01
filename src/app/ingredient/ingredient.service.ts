import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Firestore,
  collection,
  getDocs,
  CollectionReference,
} from '@angular/fire/firestore';
import { Ingredient } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  constructor(private firestore: Firestore) {}

  getIngredient(): Observable<Ingredient[]> {
    const collectionName = 'Ingredient';
    const collectionRef: CollectionReference = collection(
      this.firestore,
      collectionName
    );

    return new Observable((observer) => {
      getDocs(collectionRef)
        .then((querySnapshot) => {
          const data: Ingredient[] = [];

          querySnapshot.forEach((doc) => {
            const ingredientData = doc.data() as Ingredient;
            const ingredientWithId = { ...ingredientData, id: doc.id };

            data.push(ingredientWithId);
          });
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
