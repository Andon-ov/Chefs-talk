import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
  Firestore,
  collection,
  getDocs,
  CollectionReference,
} from '@angular/fire/firestore';
import {Allergens, Category} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AllergensService {
  constructor(private firestore: Firestore) {
  }


  getAllergens(): Observable<Allergens[]> {
    const collectionName = 'Allergens';
    const collectionRef: CollectionReference = collection(
      this.firestore,
      collectionName
    );

    return new Observable((observer) => {
      getDocs(collectionRef)
        .then((querySnapshot) => {
          const data: Allergens[] = [];

          querySnapshot.forEach((doc) => {
            const allergensData = doc.data() as any;

            const allergensWithId = {...allergensData, id: doc.id};

            data.push(allergensWithId);
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
