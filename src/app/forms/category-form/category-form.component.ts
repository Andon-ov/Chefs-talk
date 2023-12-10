import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Category } from 'src/app/shared/interfaces/interfaces';
import { FormErrorCheckService } from 'src/app/shared/form-error-check.service/form-error-check.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent {
  categoryForm: FormGroup;
  firestore: Firestore;

  constructor(
    private fb: FormBuilder,
    firestore: Firestore,
    private formErrorCheckService: FormErrorCheckService
  ) {
    this.firestore = firestore;
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      is_active: [false],
      menu: ['', [Validators.required]],
      order_index: [0],
      note: [''],
      image: [''],
    });
  }

  onSubmit() {
    this.formErrorCheckService.markFormGroupTouched(this.categoryForm);

    if (this.categoryForm.invalid) {
      alert(
        'Формата не е валидна. Моля, попълнете всички задължителни полета.'
      );
      return;
    }

    const categoryData = this.categoryForm.value;
    this.addCategory(categoryData);
    this.categoryForm.reset();
  }

  removeImage() {
    const imageControl = this.categoryForm.get('image');
    imageControl?.setValue('');
  }

  addImageToForm(imageUrl: string) {
    const imageControl = this.categoryForm.get('image');
    imageControl?.setValue(imageUrl);
  }

  get image() {
    return this.categoryForm.get('image');
  }

  addCategory(categoryData: Category) {
    const collectionName = 'Category';

    addDoc(collection(this.firestore, collectionName), categoryData)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }
}
