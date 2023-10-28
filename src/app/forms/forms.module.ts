// forms.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';

@NgModule({
  declarations: [CategoryFormComponent, RecipeFormComponent],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule],
  exports: [CategoryFormComponent],
})
export class FormsModule {}
