import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BaseRecipe,
  ImageRecipeItem,
  Ingredient,
  PreparationMethodItem,
  VideoRecipeItem,
} from '../../interfaces';
import { BaseRecipeService } from 'src/app/base-recipe/base-recipe.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-base-form-edit',
  templateUrl: './base-form-edit.component.html',
  styleUrls: ['./base-form-edit.component.css'],
})
export class BaseFormEditComponent implements OnInit {
  base: BaseRecipe | null = null;
  baseId = '';
  baseFormEdit!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private baseRecipeService: BaseRecipeService
  ) {}

  navigateToEdit() {
    this.router.navigate(['/base-edit', this.baseId]);
  }

  async ngOnInit() {
    this.initializeForm();
    await this.loadData();
  }

  private initializeForm() {
    this.baseFormEdit = this.fb.group({
      title: ['', [Validators.required]],
      base_type: ['', [Validators.required]],
      summary: [''],
      description: ['', [Validators.required]],
      base_yield: ['', [Validators.required]],
      unit: ['', [Validators.required]],

      selectedAllergen: null,
      allergens: this.fb.array([]),
      selectedAllergenNames: '',

      base_recipe_portions: [0],

      image_recipe: this.fb.array([]),
      video_recipe: this.fb.array([]),
      preparation_method: this.fb.array([]),
      ingredients: this.fb.array([]),
    });
  }

  private async loadData() {
    this.route.paramMap.subscribe(async (params) => {
      const baseId = params.get('id');
      this.baseId = baseId!;

      if (baseId) {
        try {
          this.base = await this.baseRecipeService.getBaseById(baseId);
          this.patchFormWithBaseData();
        } catch (error) {
          console.error(
            'An error occurred while retrieving the recipe:',
            error
          );
          throw error;
        }
      } else {
        console.error('Recipe ID not provided.');
      }
    });
  }

  patchFormWithBaseData() {
    if (this.base && this.baseFormEdit) {
      const ingredientsFormArray = this.baseFormEdit.get(
        'ingredients'
      ) as FormArray;
      const imagesFormArray = this.baseFormEdit.get(
        'image_recipe'
      ) as FormArray;
      const videosFormArray = this.baseFormEdit.get(
        'video_recipe'
      ) as FormArray;
      const methodsFormArray = this.baseFormEdit.get(
        'preparation_method'
      ) as FormArray;

      ingredientsFormArray.clear();
      imagesFormArray.clear();
      videosFormArray.clear();
      methodsFormArray.clear();

      this.base.ingredients.forEach((ingredient: Ingredient) => {
        ingredientsFormArray.push(
          this.fb.group({
            name: [ingredient.name, [Validators.required]],
            amount: [ingredient.amount, [Validators.required]],
            base: [ingredient.base],
            unit: [ingredient.unit, [Validators.required]],
            order_index: [ingredient.order_index],
            preparation_method: [ingredient.preparation_method],
            quantity: [ingredient.quantity],
          })
        );
      });

      if (this.base.image_recipe && this.base.image_recipe.length > 0) {
        this.base.image_recipe.forEach((image: ImageRecipeItem) => {
          imagesFormArray.push(
            this.fb.group({
              image_recipe: [image.image_recipe],
            })
          );
        });
      }

      if (this.base.video_recipe && this.base.video_recipe.length > 0) {
        this.base.video_recipe.forEach((video: VideoRecipeItem) => {
          videosFormArray.push(
            this.fb.group({
              video_recipe: [video.video_recipe],
            })
          );
        });
      }

      if (
        this.base.preparation_method &&
        this.base.preparation_method.length > 0
      ) {
        this.base.preparation_method.forEach(
          (method: PreparationMethodItem) => {
            videosFormArray.push(
              this.fb.group({
                preparation_method: [method.preparation_method],
              })
            );
          }
        );
      }

      this.baseFormEdit.patchValue({
        title: this.base.title,
        base_type: this.base.base_type,
        summary: this.base.summary,
        description: this.base.description,
        base_yield: this.base.base_yield,
        unit: this.base.unit,
        selectedAllergen: this.base.selectedAllergen,
        selectedAllergenNames: this.base.selectedAllergenNames,
        base_recipe_portions: this.base.base_recipe_portions,
      });
    }
  }

  addIngredient() {
    const ingredients = this.baseFormEdit.get('ingredients') as FormArray;

    ingredients.push(
      this.fb.group({
        name: ['', [Validators.required]],
        amount: ['', [Validators.required]],
        base: this.fb.control(''),
        unit: ['', [Validators.required]],
        order_index: [0],
        preparation_method: '',
        quantity: [0],
      })
    );
  }

  removeIngredient(index: number) {
    const ingredients = this.baseFormEdit.get('ingredients') as FormArray;
    ingredients.removeAt(index);
  }

  get ingredients() {
    return this.baseFormEdit.get('ingredients') as FormArray;
  }
  get image_recipe() {
    return this.baseFormEdit.get('image_recipe') as FormArray;
  }
  get video_recipe() {
    return this.baseFormEdit.get('video_recipe') as FormArray;
  }
  get preparation_method() {
    return this.baseFormEdit.get('preparation_method') as FormArray;
  }
}
