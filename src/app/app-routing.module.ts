import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ChefsComponent } from './chefs/chefs.component';
import { WaitersComponent } from './waiters/waiters.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { CategoryFormComponent } from './forms/category-form/category-form.component';
import { CategoryComponent } from './category/category.component';

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
    path: 'add',
    component: CategoryFormComponent,
  },

  {
    path: 'category/:id',
    component: CategoryComponent,
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
