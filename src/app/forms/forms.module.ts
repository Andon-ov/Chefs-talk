// forms.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { BaseFormComponent } from './base-form/base-form.component';

@NgModule({
  declarations: [CategoryFormComponent, RecipeFormComponent, BaseFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CategoryFormComponent],
})
export class FormsModule {}
