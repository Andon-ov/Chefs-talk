// Document ID  : ea6gXsH3ODAtIx7z8tjU
// allergen  : [/Allergen/eiAyYhcX979LIFx9jy1A]
// category  : /Category/9bLgnCk2O4xFTWhaxX3G
// description  : "Recipe Description 1"
// food_plate  : /FoodPlate/ZPBmwksvYfCkdJtJl2hs
// image_recipe  : [/Photo/YMQtOdnjKvdjNrbNcbtI]
// ingredients  : [/Ingredient/YMQtOdnjKvdjNrbNcbtI]
// order_index  : 1
// preparation_method  : [/PreparationMethod/ggPWkvA73l05cb2r2RfM]
// release_time  : 10
// season  : "Summer"
// serving_value  : 320
// summary  : "Very nice soup"
// title  : "Recipe Title 1"
// video_recipe  : [/Video/XqTMAxdMuWpTvdRl7OF5]

// interface Recipe {
//   allergen: DocumentReference[];
//   category: DocumentReference;
//   description: string;
//   food_plate: DocumentReference;
//   image_recipe: DocumentReference[];
//   ingredients: DocumentReference[];
//   order_index: number;
//   preparation_method: DocumentReference[];
//   release_time: number;
//   season: string;
//   serving_value: number;
//   summary: string;
//   title: string;
//   video_recipe: DocumentReference[];
// }

import { Component } from '@angular/core';
import { inject } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  getDocs,
  DocumentData,
} from '@angular/fire/firestore';

interface Food {
  'Document ID': string;
  detail: string;
  name: string;
}
@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.css'],
})
export class GetDataComponent {
  items: Food[] = [];
  firestore: Firestore = inject(Firestore);

  constructor() {
    const collectionName = 'Food';
    const collectionRef = collection(this.firestore, collectionName);

    getDocs(collectionRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Food;
        this.items.push(data);
      });
    });
  }
}
