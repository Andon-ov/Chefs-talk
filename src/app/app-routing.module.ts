import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ChefsComponent } from './chefs/chefs.component';
import { WaitersComponent } from './waiters/waiters.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WriteDataComponent } from './firestore/write-data/write-data.component';
import { GetDataComponent } from './firestore/get-data/get-data.component';
import { GetCollectionsComponent } from './firestore/get-collections/get-collections.component';

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
    component: WriteDataComponent,
  },
  {
    path: 'get',
    component: GetDataComponent,
  },
  {
    path: 'get-all',
    component: GetCollectionsComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
