import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe, Category } from '../shared/interfaces/interfaces';
import { AuthService } from '../shared/auth.services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  recipes: Recipe[] = [];
  category: Category | null = null;

  firestore: Firestore = inject(Firestore);
  userData: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.userData$.subscribe((userData) => {
      this.userData = userData;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      const selectedCategoryId = params['id'];

      const collectionName = 'Recipe';
      const recipesCollectionRef = collection(this.firestore, collectionName);

      const categoryDocRef = doc(
        this.firestore,
        'Category',
        selectedCategoryId
      );

      const categorySnapshot = await getDoc(categoryDocRef);
      if (categorySnapshot.exists()) {
        this.category = categorySnapshot.data() as Category;
      }
      const q = query(
        recipesCollectionRef,
        where('category', '==', selectedCategoryId)
      );

      getDocs(q)
        .then((querySnapshot) => {
          const recipes: Recipe[] = [];

          querySnapshot.forEach((doc) => {
            const data = doc.data();

            const recipe: any = {
              title: data['title'],
              image_recipe: data['image_recipe'][0]
                ? data['image_recipe'][0]['image_recipe']
                : null,
              order_index: data['order_index'],
              id: doc.id,
            };
            recipes.push(recipe);
          });
          this.recipes = recipes.sort((a, b) => {
            const orderIndexA = Number(a.order_index);
            const orderIndexB = Number(b.order_index);
            return orderIndexA - orderIndexB;
          });
        })
        .catch((error) => {
          console.error('Error retrieving recipes: ', error);
        });
    });
  }
}
