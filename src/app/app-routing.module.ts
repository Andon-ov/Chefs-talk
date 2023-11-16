import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ChefsComponent } from './chefs/chefs.component';
import { WaitersComponent } from './waiters/waiters.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { CategoryFormComponent } from './forms/category-form/category-form.component';
import { CategoryComponent } from './category/category.component';
import { RecipeFormComponent } from './forms/recipe-form/recipe-form.component';
import { RecipeComponent } from './recipe/recipe.component';
import { BaseFormComponent } from './forms/base-form/base-form.component';
import { BaseRecipeComponent } from './base-recipe/base-recipe.component';
import { BaseListComponent } from './base-list/base-list.component';
import { BaseFormEditComponent } from './forms/base-form-edit/base-form-edit.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: MainComponent,
  },
  {
    path: 'chefs',
    component: ChefsComponent,
  },
  {
    path: 'waiters',
    component: WaitersComponent,
  },
  {
    path: 'add-category',
    component: CategoryFormComponent,
  },
  {
    path: 'add-recipe',
    component: RecipeFormComponent,
  },
  {
    path: 'add-base',
    component: BaseFormComponent,
  },
  {
    path: 'base/:id',
    component: BaseRecipeComponent,
  },
  {
    path: 'base',
    component: BaseListComponent,
  },

  {
    path: 'category/:id',
    component: CategoryComponent,
  },
  {
    path: 'recipe/:id',
    component: RecipeComponent,
  },

  {
    path: 'base-edit/:id',
    component: BaseFormEditComponent,
  },
  { path: 'sign-in', component: SignInComponent },
  // {
  //   path: '**',
  //   component: NotFoundComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
