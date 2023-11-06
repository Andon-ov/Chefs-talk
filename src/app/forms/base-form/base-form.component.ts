import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  CollectionReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BaseRecipeService } from 'src/app/base-recipe/base-recipe.service';
import { CategoriesService } from 'src/app/list-categories/categories.service';
import { Allergens, BaseRecipe, Category, Plates } from 'src/app/interfaces';

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
  isBaseControl: any;

  constructor(
    firestore: Firestore,
    private fb: FormBuilder,
    private baseRecipeService: BaseRecipeService,
    private categoriesService: CategoriesService
  ) {
    this.firestore = firestore;

    this.baseForm = this.fb.group({
      // base recipe
      title: '',
      description: '',
      summary: '',
      selectedAllergen: null,
      allergens: this.fb.array([]),
      selectedAllergenNames: '',

      // new
      base_type: '',
      base_recipe_portions: [0],
      base_yield: [0],
      // new end

      image_recipe: this.fb.array([]),
      video_recipe: this.fb.array([]),
      preparation_method: this.fb.array([]),
      ingredients: this.fb.array([
        this.fb.group({
          name: '',
          amount: null,
          base: this.fb.control(null),
          order_index: [0],
          preparation_method: '',
          quantity: [0],
          unit: '',
        }),
      ]),
    });

    this.getAllergens().subscribe((data) => {
      this.allergens = data;
    });

  
  }

  ngOnInit(): void {
    this.getBaseRecipe();
  }

  // image
  addImage() {
    const imageArray = this.baseForm.get('image_recipe') as FormArray;
    imageArray.push(
      this.fb.group({
        image_recipe: '',
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

  addIngredient() {
    const ingredientsArray = this.baseForm.get('ingredients') as FormArray;
    ingredientsArray.push(
      this.fb.group({
        name: '',
        amount: null,

        base: this.fb.control(null),
        is_base: false, // if base true

        order_index: this.currentOrderIndex,
        quantity: [0],
        preparation_method: '',
        unit: '',
      })
    );
    this.currentOrderIndex++;
  }

  addReferenceToSelectedAllergen(event: any) {
    const selectedAllergenId = event.target.value;
    const allergensArray = this.baseForm.get('allergens') as FormArray;
    allergensArray.push(this.fb.control(selectedAllergenId));
  }

  // adding reference to object in array
  // addSelectedAllergen() {
  //   const selectedAllergenId = this.baseForm.get('selectedAllergen')?.value;
  //   const allergensArray = this.baseForm.get('allergens') as FormArray;
  //   allergensArray.push(this.fb.control(selectedAllergenId));
  // }

  addSelectedAllergen() {
    const selectedAllergenId = this.baseForm.get('selectedAllergen')?.value;
    const allergensArray = this.baseForm.get('allergens') as FormArray;
    allergensArray.push(this.fb.control(selectedAllergenId));

    const selectedAllergenNames = this.baseForm.get('selectedAllergenNames');
    const selectedAllergen = this.allergens.find(
      (a) => a.id === selectedAllergenId
    );
    if (selectedAllergen) {
      selectedAllergenNames?.setValue(
        selectedAllergenNames.value
          ? selectedAllergenNames.value + ', ' + selectedAllergen.name
          : selectedAllergen.name
      );

    }
  }

  onIsBaseChange() {
    const ingredientsArray = this.baseForm.get('ingredients') as FormArray;
    this.isBaseControl = ingredientsArray.value[0].is_base;
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

  onSubmit() {
    if (this.baseForm.valid) {
      const baseRecipeData = this.baseForm.value;
      this.addBaseRecipe(baseRecipeData);
      this.baseForm.reset();
    }
  }



  getAllergens(): Observable<Allergens[]> {
    const collectionName = 'Allergens';
    const collectionRef: CollectionReference = collection(
      this.firestore,
      collectionName
    );

    return new Observable((observer) => {
      getDocs(collectionRef)
        .then((querySnapshot) => {
          const data: Allergens[] = [];

          querySnapshot.forEach((doc) => {
            const allergensData = doc.data() as any;

            const allergensWithId = { ...allergensData, id: doc.id };

            data.push(allergensWithId);
          });
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
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

    addDoc(collection(this.firestore, collectionName), baseRecipeData)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }
}