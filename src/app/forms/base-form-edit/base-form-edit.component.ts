import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Allergens,
  BaseRecipe,
  ImageRecipeItem,
  Ingredient,
  PreparationMethodItem,
  VideoRecipeItem,
} from '../../shared/interfaces/interfaces';
import { Firestore, updateDoc, doc } from '@angular/fire/firestore';
import { BaseRecipeService } from 'src/app/shared/base-recipe.services/base-recipe.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { AllergensService } from '../../shared/allergens.services/allergens.service';
import { FormErrorCheckService } from 'src/app/shared/form-error-check.service/form-error-check.service';

@Component({
  selector: 'app-base-form-edit',
  templateUrl: './base-form-edit.component.html',
  styleUrls: ['./base-form-edit.component.css'],
})
export class BaseFormEditComponent implements OnInit {
  base: BaseRecipe | null = null;
  baseId = '';
  baseFormEdit!: FormGroup;
  firestore: Firestore;
  baseRecipes: BaseRecipe[] = [];
  allergens: Allergens[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private baseRecipeService: BaseRecipeService,
    private allergenService: AllergensService,
    private formErrorCheckService: FormErrorCheckService,
    firestore: Firestore
  ) {
    this.firestore = firestore;
  }

  navigateToEdit() {
    this.router.navigate(['/base-edit', this.baseId]);
  }

  async ngOnInit() {
    this.initializeForm();
    await this.loadData();
    this.getBaseRecipe();
    this.getAllergens();
  }

  private initializeForm() {
    this.baseFormEdit = this.fb.group({
      title: ['', [Validators.required]],
      base_type: ['', [Validators.required]],
      description: ['', [Validators.required]],
      base_yield: ['', [Validators.required]],
      unit: ['', [Validators.required]],

      summary: [''],
      base_recipe_portions: [0],

      allergens: this.fb.array([]),
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
      const allergensFormArray = this.baseFormEdit.get(
        'allergens'
      ) as FormArray;

      ingredientsFormArray.clear();
      imagesFormArray.clear();
      videosFormArray.clear();
      methodsFormArray.clear();
      allergensFormArray.clear();

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
            methodsFormArray.push(
              this.fb.group({
                preparation_method: [method.preparation_method],
              })
            );
          }
        );
      }

      if (this.base.allergens && this.base.allergens.length > 0) {
        this.base.allergens.forEach((allergen: any) => {
          allergensFormArray.push(this.fb.control(allergen));
        });
      }

      this.baseFormEdit.patchValue({
        title: this.base.title,
        base_type: this.base.base_type,
        summary: this.base.summary,
        description: this.base.description,
        base_yield: this.base.base_yield,
        unit: this.base.unit,
        base_recipe_portions: this.base.base_recipe_portions,
      });
    }
  }

  isAllergenSelected(allergenId: string): boolean {
    return this.added_allergens.value.some(
      (addedAllergenId: string) => addedAllergenId === allergenId
    );
  }

  toggleAllergenSelection(allergenId: string): void {
    const index = this.added_allergens.value.indexOf(allergenId);

    if (index === -1) {
      this.added_allergens.push(new FormControl(allergenId));
    } else {
      this.added_allergens.removeAt(index);
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

  get added_allergens() {
    return this.baseFormEdit.get('allergens') as FormArray;
  }

  onSubmit() {
    this.formErrorCheckService.markFormGroupTouched(this.baseFormEdit);
    this.formErrorCheckService.markFormArrayControlsTouched(this.ingredients);

    if (this.baseFormEdit.invalid) {
      alert(
        'Формата не е валидна. Моля, попълнете всички задължителни полета.'
      );
      return;
    }

    const baseRecipeData = this.baseFormEdit.value;
    this.addBaseRecipe(baseRecipeData);
    this.baseFormEdit.reset();
  }

  addPreparation() {
    const preparationArray = this.baseFormEdit.get(
      'preparation_method'
    ) as FormArray;
    preparationArray.push(
      this.fb.group({
        preparation_method: '',
      })
    );
  }

  removePreparation(index: number) {
    const preparationArray = this.baseFormEdit.get(
      'preparation_method'
    ) as FormArray;
    preparationArray.removeAt(index);
  }

  addVideo() {
    const videoArray = this.baseFormEdit.get('video_recipe') as FormArray;

    videoArray.push(
      this.fb.group({
        video_recipe: '',
      })
    );
  }

  removeVideo(index: number) {
    const videoArray = this.baseFormEdit.get('video_recipe') as FormArray;
    videoArray.removeAt(index);
  }

  removeImage(index: number) {
    const imageArray = this.baseFormEdit.get('image_recipe') as FormArray;
    imageArray.removeAt(index);
  }

  addImageToForm(imageUrl: string) {
    const imageArray = this.baseFormEdit.get('image_recipe') as FormArray;
    imageArray.push(
      this.fb.group({
        image_recipe: imageUrl,
      })
    );
  }

  getAllergens(): void {
    this.allergenService.getAllergens().subscribe({
      next: (allergens) => {
        this.allergens = allergens;
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
  }

  getBaseRecipe(): void {
    this.baseRecipeService.getBaseRecipe().subscribe({
      next: (baseRecipes) => {
        this.baseRecipes = baseRecipes;
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
  }

  addBaseRecipe(baseRecipeData: any) {
    const collectionName = 'BaseRecipe';
    const docRef = doc(this.firestore, collectionName, this.baseId);
    updateDoc(docRef, baseRecipeData);
    this.router.navigate(['/base', this.baseId]);
  }
}
