import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { BaseFormComponent } from './base-form/base-form.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { BaseFormEditComponent } from './base-form-edit/base-form-edit.component';
import { RecipeFormEditComponent } from './recipe-form-edit/recipe-form-edit.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        CategoryFormComponent,
        RecipeFormComponent,
        BaseFormComponent,
        CommentFormComponent,
        ImageUploadComponent,
        BaseFormEditComponent,
        RecipeFormEditComponent,
    ],
    exports: [CategoryFormComponent, CommentFormComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class FormsModule {}
