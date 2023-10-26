// forms.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [CategoryFormComponent],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule],
  exports: [CategoryFormComponent],
})
export class FormsModule {}
