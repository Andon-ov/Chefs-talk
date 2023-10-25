import { Component } from '@angular/core';
import { inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  CollectionReference,
  DocumentData,
  query,
} from '@angular/fire/firestore';



@Component({
  selector: 'app-write-data',
  templateUrl: './write-data.component.html',
  styleUrls: ['./write-data.component.css'],
})
export class WriteDataComponent {
  // Add data
  firestore: Firestore = inject(Firestore);

  constructor() {
    async function newAllergen(firestore: any) {
      const collectionName = 'Allergen';

      try {
        const docRef = await addDoc(collection(firestore, collectionName), {
          title: 'Test',
        });
        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
    newAllergen(this.firestore);
  }
}

interface Allergen {
  title: string;
}
