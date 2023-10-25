import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

interface Category {
  image: string;
  is_active: boolean;
  menu: string;
  name: string;
  note: string;
  order_index: number;
}
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  items: Category[] = [];
  firestore: Firestore = inject(Firestore);

  constructor() {
    const collectionName = 'Category';
    const collectionRef = collection(this.firestore, collectionName);

    getDocs(collectionRef)
      .then(async (querySnapshot) => {
        for (const doc of querySnapshot.docs) {
          const data = doc.data() as Category;

          this.items.push({
            name: data.name,
            image: data['image'],
            is_active: data.is_active,
            menu: data.menu,
            note: data.note,
            order_index: data.order_index,
          });
        }
      })
      .catch((error) => {
        console.error('Error getting documents: ', error);
      });
  }
}
