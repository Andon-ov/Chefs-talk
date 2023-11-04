import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { WaitersComponent } from './waiters/waiters.component';

import { ChefsComponent } from './chefs/chefs.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { CategoryComponent } from './category/category.component';
import { RecipeComponent } from './recipe/recipe.component';

import { FormsModule } from './forms/forms.module';
import { BaseRecipeComponent } from './base-recipe/base-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import {CloudinaryModule} from '@cloudinary/ng';
import { IngredientComponent } from './ingredient/ingredient.component';
import { TestComponent } from './test/test.component';
import { SafeUrlPipe } from './safe-url.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    WaitersComponent,
    ChefsComponent,
    NotFoundComponent,
    ListCategoriesComponent,
    CategoryComponent,
    RecipeComponent,
    BaseRecipeComponent,
    IngredientComponent,
    TestComponent,
    SafeUrlPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ShareModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    // Cloud Firestore
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    // Cloudinary
    CloudinaryModule,



  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
