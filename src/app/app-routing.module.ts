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
    path: 'category/:id',
    component: CategoryComponent,
  },
  {
    path: 'recipe/:id',
    component: RecipeComponent,
  },
  // {
  //   path: '**',
  //   component: NotFoundComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
