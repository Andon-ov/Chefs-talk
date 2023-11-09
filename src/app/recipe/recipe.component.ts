import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Comments, Plates, Recipe } from '../interfaces';
import { RecipeService } from './recipe.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { CommentService } from './comment.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent {
  recipe: Recipe | null = null;
  category: Category | null = null;
  plate: Plates | null = null;
  comments: Comments[] = [];
  recipeId: string | null = '';
  showCommentForm = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private firestore: Firestore,
    private commentService: CommentService
  ) {
    this.route.paramMap.subscribe(async (params) => {
      const recipeId = params.get('id');
      this.recipeId = recipeId;

      if (recipeId) {
        try {
          this.recipe = await this.recipeService.getRecipeById(recipeId);

          this.comments = await commentService.getCommentsForRecipe(recipeId);

          if (this.recipe) {
            await this.loadCategoryAndPlateData();
          } else {
            console.error('Recipe not found.');
          }
        } catch (error) {
          console.error(
            'An error occurred while retrieving the recipe:',
            error
          );
        }
      } else {
        console.error('Recipe ID not provided.');
      }
    });

    commentService.getCommentAddedObservable().subscribe(() => {
      console.log('Comment successfully added.');
      this.loadCommentsForRecipe();
    });
  }

  toggleCommentForm() {
    this.showCommentForm = !this.showCommentForm;
  }

  private async loadCommentsForRecipe() {
    if (this.recipeId) {
      this.comments = await this.commentService.getCommentsForRecipe(
        this.recipeId
      );
    }
  }

  private async loadCategoryAndPlateData() {
    const selectedPlateId = this.recipe?.food_plate;
    const selectedCategoryId = this.recipe?.category;

    if (selectedPlateId) {
      const platesDocRef = doc(this.firestore, 'Plates/' + selectedPlateId);
      const platesSnapshot = await getDoc(platesDocRef);
      if (platesSnapshot.exists()) {
        this.plate = platesSnapshot.data() as Plates;
      }
    }

    if (selectedCategoryId) {
      const categoryDocRef = doc(
        this.firestore,
        'Category/' + selectedCategoryId
      );
      const categorySnapshot = await getDoc(categoryDocRef);
      if (categorySnapshot.exists()) {
        this.category = categorySnapshot.data() as Category;
      }
    }
  }
}
