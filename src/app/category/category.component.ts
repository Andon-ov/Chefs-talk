import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Category {
  image: string;
  is_active: boolean;
  menu: string;
  name: string;
  note: string;
  order_index: number;
  id: string;
}
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  items: Category[] = [];
  firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      const selectedCategoryId = params['id'];
      console.log(selectedCategoryId);
      
      const collectionName = 'Recipe';
      const recipesCollectionRef = collection(this.firestore, collectionName);
      const q = query(
        recipesCollectionRef,
        where('categoryId', '==', selectedCategoryId)
      );

      getDocs(q)
        .then((querySnapshot) => {
          const recipes: any[] = [];
          querySnapshot.forEach((doc) => {
            recipes.push(doc.data());
          });
          console.log('Рецептите за избраната категория: ', recipes);
        })
        .catch((error) => {
          console.error('Грешка при извличането на рецептите: ', error);
        });
    });
  }
}
