import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Allergens, BaseRecipe} from '../shared/interfaces/interfaces';
import {BaseRecipeService} from '../shared/base-recipe.services/base-recipe.service';
import {AuthService} from '../shared/auth.services/auth.service';
import {AllergensService} from '../shared/allergens.services/allergens.service';

@Component({
  selector: 'app-base-recipe',
  templateUrl: './base-recipe.component.html',
  styleUrls: ['./base-recipe.component.css'],
})
export class BaseRecipeComponent implements OnInit {
  base: BaseRecipe | null = null;
  baseId = '';
  userData: any;
  allergens: Allergens[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private baseRecipeService: BaseRecipeService,
    private authService: AuthService,
    private allergenService: AllergensService
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

  ngOnInit(): void {
    this.getAllergens();
  }

  getAllergens(): void {
    this.allergenService.getAllergens().subscribe({
      next: (allergens) => {
        const recipeAllergenRefs = this.base?.allergens || [];

        // Remove undefined elements from the recipe allergens array
        const filteredRecipeAllergenRefs = recipeAllergenRefs.filter(Boolean);

        allergens.forEach((allergen) => {
          // all allergen id
          const allergenId = allergen.id;

          const result = filteredRecipeAllergenRefs.filter((ref) => {
            // this is a recipe allergens id
            const refId = ref as unknown as string;
            return refId === allergenId;
          });

          // Add allergen only if there is a match
          if (result.length > 0) {
            this.allergens.push(allergen);
          }
        });
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
  }
}
