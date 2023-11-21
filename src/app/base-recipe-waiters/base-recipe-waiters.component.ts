import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseRecipe } from '../shared/interfaces/interfaces';
import { BaseRecipeService } from '../shared/base-recipe.services/base-recipe.service';

@Component({
  selector: 'app-base-recipe-waiters',
  templateUrl: './base-recipe-waiters.component.html',
  styleUrls: ['./base-recipe-waiters.component.css'],
})
export class BaseRecipeWaitersComponent {
  base: BaseRecipe | null = null;
  baseId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private baseRecipeService: BaseRecipeService
  ) {
    this.route.paramMap.subscribe(async (params) => {
      const baseId = params.get('id');
      this.baseId = baseId!;

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
