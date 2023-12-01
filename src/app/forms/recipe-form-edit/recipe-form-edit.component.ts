import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Allergens,
  BaseRecipe,
  Category,
  ImageRecipeItem,
  Ingredient,
  Plates,
  PreparationMethodItem,
  Recipe,
  VideoRecipeItem,
} from '../../shared/interfaces/interfaces';
import { Firestore, updateDoc, doc } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { AllergensService } from '../../shared/allergens.services/allergens.service';
import { RecipeService } from 'src/app/shared/recipe.services/recipe.service';
import { BaseRecipeService } from 'src/app/shared/base-recipe.services/base-recipe.service';
import { CategoriesService } from 'src/app/shared/categories.services/categories.service';
import { PlatesService } from 'src/app/shared/plates.services/plates.service';

@Component({
  selector: 'app-recipe-form-edit',
  templateUrl: './recipe-form-edit.component.html',
  styleUrls: ['./recipe-form-edit.component.css'],
})
export class RecipeFormEditComponent implements OnInit {
  recipe: Recipe | null = null;
  recipeId = '';
  recipeFormEdit!: FormGroup;
  firestore: Firestore;
  baseRecipes: BaseRecipe[] = [];
  categories: Category[] = [];
  plates: Plates[] = [];
  allergens: Allergens[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private baseRecipeService: BaseRecipeService,
    private allergenService: AllergensService,
    private categoryService: CategoriesService,
    private plateService: PlatesService,
    firestore: Firestore
  ) {
    this.firestore = firestore;
  }

  navigateToEdit() {
    this.router.navigate(['/recipe-edit', this.recipeId]);
  }

  async ngOnInit() {
    this.initializeForm();
    await this.loadData();
    this.getBaseRecipe();
    this.getAllergens();
    this.getCategories();
    this.getPlates();
  }

  private initializeForm() {
    this.recipeFormEdit = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      summary: [''],

      allergens: this.fb.array([]),
      image_recipe: this.fb.array([]),
      video_recipe: this.fb.array([]),
      preparation_method: this.fb.array([]),

      season: ['', [Validators.required]],
      release_time: [0],
      serving_value: [0],
      order_index: [0],

      category: ['', [Validators.required]],
      food_plate: ['', [Validators.required]],

      ingredients: this.fb.array([]),
    });
  }

  private async loadData() {
    this.route.paramMap.subscribe(async (params) => {
      const recipeId = params.get('id');
      this.recipeId = recipeId!;

      if (recipeId) {
        try {
          this.recipe = await this.recipeService.getRecipeById(recipeId);
          this.patchFormWithRecipeData();
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

  patchFormWithRecipeData() {
    if (this.recipe && this.recipeFormEdit) {
      const ingredientsFormArray = this.recipeFormEdit.get(
        'ingredients'
      ) as FormArray;
      const imagesFormArray = this.recipeFormEdit.get(
        'image_recipe'
      ) as FormArray;
      const videosFormArray = this.recipeFormEdit.get(
        'video_recipe'
      ) as FormArray;
      const methodsFormArray = this.recipeFormEdit.get(
        'preparation_method'
      ) as FormArray;
      const allergensFormArray = this.recipeFormEdit.get(
        'allergens'
      ) as FormArray;

      ingredientsFormArray.clear();
      imagesFormArray.clear();
      videosFormArray.clear();
      methodsFormArray.clear();
      allergensFormArray.clear();

      this.recipe.ingredients.forEach((ingredient: Ingredient) => {
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

      if (this.recipe.image_recipe && this.recipe.image_recipe.length > 0) {
        this.recipe.image_recipe.forEach((image: ImageRecipeItem) => {
          imagesFormArray.push(
            this.fb.group({
              image_recipe: [image.image_recipe],
            })
          );
        });
      }

      if (this.recipe.video_recipe && this.recipe.video_recipe.length > 0) {
        this.recipe.video_recipe.forEach((video: VideoRecipeItem) => {
          videosFormArray.push(
            this.fb.group({
              video_recipe: [video.video_recipe],
            })
          );
        });
      }

      if (
        this.recipe.preparation_method &&
        this.recipe.preparation_method.length > 0
      ) {
        this.recipe.preparation_method.forEach(
          (method: PreparationMethodItem) => {
            methodsFormArray.push(
              this.fb.group({
                preparation_method: [method.preparation_method],
              })
            );
          }
        );
      }

      if (this.recipe.allergens && this.recipe.allergens.length > 0) {
        this.recipe.allergens.forEach((allergen: any) => {
          allergensFormArray.push(this.fb.control(allergen));
        });
      }

      this.recipeFormEdit.patchValue({
        title: this.recipe.title,
        season: this.recipe.season,
        summary: this.recipe.summary,
        description: this.recipe.description,
        category: this.recipe.category,
        food_plate: this.recipe.food_plate,
        unit: this.recipe.unit,
        release_time: this.recipe.release_time,
        serving_value: this.recipe.serving_value,
        order_index: this.recipe.order_index,
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
    const ingredients = this.recipeFormEdit.get('ingredients') as FormArray;

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
    const ingredients = this.recipeFormEdit.get('ingredients') as FormArray;
    ingredients.removeAt(index);
  }

  get ingredients() {
    return this.recipeFormEdit.get('ingredients') as FormArray;
  }

  get image_recipe() {
    return this.recipeFormEdit.get('image_recipe') as FormArray;
  }

  get video_recipe() {
    return this.recipeFormEdit.get('video_recipe') as FormArray;
  }

  get preparation_method() {
    return this.recipeFormEdit.get('preparation_method') as FormArray;
  }

  get added_allergens() {
    return this.recipeFormEdit.get('allergens') as FormArray;
  }

  onSubmit() {
    if (this.recipeFormEdit.valid) {
      const recipeData = this.recipeFormEdit.value;
      this.addRecipe(recipeData);
      this.recipeFormEdit.reset();
    } else {
      console.log('form invalid');
    }
  }

  addPreparation() {
    const preparationArray = this.recipeFormEdit.get(
      'preparation_method'
    ) as FormArray;
    preparationArray.push(
      this.fb.group({
        preparation_method: '',
      })
    );
  }

  removePreparation(index: number) {
    const preparationArray = this.recipeFormEdit.get(
      'preparation_method'
    ) as FormArray;
    preparationArray.removeAt(index);
  }

  addVideo() {
    const videoArray = this.recipeFormEdit.get('video_recipe') as FormArray;

    videoArray.push(
      this.fb.group({
        video_recipe: '',
      })
    );
  }

  removeVideo(index: number) {
    const videoArray = this.recipeFormEdit.get('video_recipe') as FormArray;
    videoArray.removeAt(index);
  }

  removeImage(index: number) {
    const imageArray = this.recipeFormEdit.get('image_recipe') as FormArray;
    imageArray.removeAt(index);
  }

  addImageToForm(imageUrl: string) {
    const imageArray = this.recipeFormEdit.get('image_recipe') as FormArray;
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

  getCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  getPlates(): void {
    this.plateService.getPlates().subscribe({
      next: (plates) => {
        this.plates = plates;
      },
      error: (error) => {
        console.error('Error fetching plates:', error);
      },
    });
  }

  addRecipe(recipeData: any) {
    const collectionName = 'Recipe';
    const docRef = doc(this.firestore, collectionName, this.recipeId);
    updateDoc(docRef, recipeData);
    this.router.navigate(['/recipe', this.recipeId]);
  }
}
