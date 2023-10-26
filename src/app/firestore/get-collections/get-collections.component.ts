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
  selector: 'app-get-collections',
  templateUrl: './get-collections.component.html',
  styleUrls: ['./get-collections.component.css'],
})
export class GetCollectionsComponent {
  firestore: Firestore = inject(Firestore);
  constructor() {
    
    async function getMoreData(firestore: any) {
      // get multi collection

      // Query a reference to a subcollection
      const querySnapshot = await getDocs(
        collection(firestore, 'Recipe', 'Allergen', 'Ingredient')
      );
      querySnapshot.forEach((doc: any) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
      });
    }
    getMoreData(this.firestore);
  }
}
