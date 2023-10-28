import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Firestore,
  collection,
  getDocs,
  CollectionReference,
  DocumentData,
} from '@angular/fire/firestore';
import { Category } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestore: Firestore) {}

  getCategories(): Observable<Category[]> {
    const collectionName = 'Category';
    const collectionRef: CollectionReference = collection(
      this.firestore,
      collectionName
    );
  
    return new Observable((observer) => {
      getDocs(collectionRef)
        .then((querySnapshot) => {
          const data: Category[] = [];
          
          querySnapshot.forEach((doc) => {
            const categoryData = doc.data() as Category;
            const categoryWithId = { ...categoryData, id: doc.id };
    
            data.push(categoryWithId);
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


