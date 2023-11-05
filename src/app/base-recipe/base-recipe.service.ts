import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Firestore,
  collection,
  getDocs,
  CollectionReference,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { BaseRecipe } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class BaseRecipeService  {
  constructor(private firestore: Firestore) {}

  getBaseRecipe(): Observable<BaseRecipe[]> {
    const collectionName = 'BaseRecipe';
    const collectionRef: CollectionReference = collection(
      this.firestore,
      collectionName
    );
  
    return new Observable((observer) => {
      getDocs(collectionRef)
        .then((querySnapshot) => {
          const data: BaseRecipe[] = [];
          
          querySnapshot.forEach((doc) => {
            const baseRecipeData = doc.data() as BaseRecipe;
            const baseRecipeWithId = { ...baseRecipeData, id: doc.id };
    
            data.push(baseRecipeWithId);
          });
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });

    
  }

  async getBaseById(baseId: string): Promise<BaseRecipe | null> {
    const baseDocRef = doc(this.firestore, 'BaseRecipe', baseId);
    const baseSnapshot = await getDoc(baseDocRef);

    if (baseSnapshot.exists()) {
      return baseSnapshot.data() as BaseRecipe;
    } else {
      return null;
    }
  }


  
}


