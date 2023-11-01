import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  doc
} from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../interfaces';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  recipes: Recipe[] = [];
  firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const selectedCategoryId = params['id'];

      const collectionName = 'Recipe';
      const recipesCollectionRef = collection(this.firestore, collectionName);

      const categoryDocRef = doc(this.firestore, "Category", selectedCategoryId);

      const q = query(
        recipesCollectionRef,
        where("category", "==", categoryDocRef)
      );

      getDocs(q)
        .then((querySnapshot) => {
          const recipes: any[] = [];

          querySnapshot.forEach((doc) => {

            const RecipesData = doc.data();
            const ingredientWithId = { ...RecipesData, id: doc.id };

            console.log(ingredientWithId);

            recipes.push(ingredientWithId);
          });
          console.log('Рецептите за избраната категория: ', recipes);
          this.recipes = recipes; // Задаване на данните след получаване
        })
        .catch((error) => {
          console.error('Грешка при извличането на рецептите: ', error);
        });
    });
  }
}