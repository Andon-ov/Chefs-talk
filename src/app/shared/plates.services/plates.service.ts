import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Firestore,
  collection,
  getDocs,
  CollectionReference,
} from '@angular/fire/firestore';
import { Plates } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PlatesService {
  constructor(private firestore: Firestore) {}

  getPlates(): Observable<Plates[]> {
    const collectionName = 'Plates';
    const collectionRef: CollectionReference = collection(
      this.firestore,
      collectionName
    );

    return new Observable((observer) => {
      getDocs(collectionRef)
        .then((querySnapshot) => {
          const data: Plates[] = [];

          querySnapshot.forEach((doc) => {
            const platesData = doc.data() as any;

            const platesWithId = { ...platesData, id: doc.id };

            data.push(platesWithId);
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
