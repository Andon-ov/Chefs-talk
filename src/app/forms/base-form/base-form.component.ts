import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { BaseRecipeService } from 'src/app/shared/base-recipe.services/base-recipe.service';
import { Allergens, BaseRecipe } from 'src/app/shared/interfaces/interfaces';
import { AllergensService } from 'src/app/shared/allergens.services/allergens.service';
import { FormErrorCheckService } from 'src/app/shared/form-error-check.service/form-error-check.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.css'],
})
export class BaseFormComponent implements OnInit {
  baseForm: FormGroup;
  firestore: Firestore;
  allergens: Allergens[] = [];
  baseRecipes: BaseRecipe[] = [];
  currentOrderIndex = 1;

  constructor(
    firestore: Firestore,
    private fb: FormBuilder,
    private baseRecipeService: BaseRecipeService,
    private allergenService: AllergensService,
    private formErrorCheckService: FormErrorCheckService,
    private router: Router
  ) {
    this.firestore = firestore;

    this.baseForm = this.fb.group({
      title: ['', [Validators.required]],
      base_type: ['', [Validators.required]],
      summary: [''],
      description: ['', [Validators.required]],
      base_yield: ['', [Validators.required]],
      unit: ['', [Validators.required]],

      base_recipe_portions: [0],

      allergens: this.fb.array([]),
      image_recipe: this.fb.array([]),
      video_recipe: this.fb.array([]),
      preparation_method: this.fb.array([]),
      ingredients: this.fb.array([
        this.fb.group({
          name: ['', [Validators.required]],
          amount: [null, [Validators.required]],
          base: this.fb.control(null),
          unit: ['', [Validators.required]],
          order_index: [0],
          preparation_method: '',
          quantity: [0],
        }),
      ]),
    });
  }

  // Start here
  ngOnInit(): void {
    this.getBaseRecipe();
    this.getAllergens();
  }

  // image
  addImageToForm(imageUrl: string) {
    const imageArray = this.baseForm.get('image_recipe') as FormArray;
    imageArray.push(
      this.fb.group({
        image_recipe: imageUrl,
      })
    );
  }

  removeImage(index: number) {
    const imageArray = this.baseForm.get('image_recipe') as FormArray;
    imageArray.removeAt(index);
  }

  // video
  addVideo() {
    const videoArray = this.baseForm.get('video_recipe') as FormArray;

    videoArray.push(
      this.fb.group({
        video_recipe: '',
      })
    );
  }

  removeVideo(index: number) {
    const videoArray = this.baseForm.get('video_recipe') as FormArray;
    videoArray.removeAt(index);
  }

  // preparation
  addPreparation() {
    const preparationArray = this.baseForm.get(
      'preparation_method'
    ) as FormArray;
    preparationArray.push(
      this.fb.group({
        preparation_method: '',
      })
    );
  }

  removePreparation(index: number) {
    const preparationArray = this.baseForm.get(
      'preparation_method'
    ) as FormArray;
    preparationArray.removeAt(index);
  }

  // ingredients
  addIngredient() {
    const ingredientsArray = this.baseForm.get('ingredients') as FormArray;
    ingredientsArray.push(
      this.fb.group({
        name: ['', [Validators.required]],
        amount: [null, [Validators.required]],
        base: this.fb.control(null),
        order_index: this.currentOrderIndex,
        preparation_method: '',
        quantity: [0],
        unit: ['', [Validators.required]],
      })
    );
    this.currentOrderIndex++;
  }

  removeIngredient(index: number) {
    const ingredients = this.baseForm.get('ingredients') as FormArray;
    ingredients.removeAt(index);
  }

  // allergen
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

  get ingredients() {
    return this.baseForm.get('ingredients') as FormArray;
  }

  get image_recipe() {
    return this.baseForm.get('image_recipe') as FormArray;
  }

  get video_recipe() {
    return this.baseForm.get('video_recipe') as FormArray;
  }

  get preparation_method() {
    return this.baseForm.get('preparation_method') as FormArray;
  }

  get added_allergens() {
    return this.baseForm.get('allergens') as FormArray;
  }

  onSubmit() {
    this.formErrorCheckService.markFormGroupTouched(this.baseForm);
    this.formErrorCheckService.markFormArrayControlsTouched(this.ingredients);

    if (this.baseForm.invalid) {
      alert(
        'Формата не е валидна. Моля, попълнете всички задължителни полета.'
      );
      return;
    }

    const baseRecipeData = this.baseForm.value;
    this.addBaseRecipe(baseRecipeData);
    this.baseForm.reset();
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
        this.baseRecipes = baseRecipes.sort((a, b) => a.title.localeCompare(b.title));
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
  }

  addBaseRecipe(baseRecipeData: BaseRecipe) {
    const collectionName = 'BaseRecipe';

    addDoc(collection(this.firestore, collectionName), baseRecipeData)
      .then((docRef) => {
        this.router.navigate(['/base', docRef.id]);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }
}
