import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseRecipe } from '../interfaces';
import { BaseRecipeService } from './base-recipe.service';

@Component({
  selector: 'app-base-recipe',
  templateUrl: './base-recipe.component.html',
  styleUrls: ['./base-recipe.component.css'],
})
export class BaseRecipeComponent {
  base: BaseRecipe | null = null;

  constructor(
    private route: ActivatedRoute,
    private baseRecipeService: BaseRecipeService
  ) {
    this.route.paramMap.subscribe(async (params) => {
      const baseId = params.get('id');

      if (baseId) {
        try {
          this.base = await this.baseRecipeService.getBaseById(baseId);
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
  }
}
