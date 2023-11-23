import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseRecipe} from '../shared/interfaces/interfaces';
import {BaseRecipeService} from '../shared/base-recipe.services/base-recipe.service';
import { AuthService } from '../shared/auth.services/auth.service';

@Component({
  selector: 'app-base-recipe',
  templateUrl: './base-recipe.component.html',
  styleUrls: ['./base-recipe.component.css'],
})
export class BaseRecipeComponent {
  base: BaseRecipe | null = null;
  baseId = '';
  userData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private baseRecipeService: BaseRecipeService,
    private authService: AuthService
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

    this.authService.userData$.subscribe((userData) => {
      this.userData = userData;
    
    });
  }

  navigateToEdit() {
    this.router.navigate(['/base-edit', this.baseId]);
  }
}
