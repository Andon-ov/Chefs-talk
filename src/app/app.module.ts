import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { MainComponent } from './main/main.component';
import {HttpClientModule} from '@angular/common/http';
import { WaitersComponent } from './waiters/waiters.component';
import { ChefsComponent } from './chefs/chefs.component';
import { NotFoundComponent } from './not-found/not-found.component'
import { RouterModule } from '@angular/router';


import { AngularFireModule } from "@angular/fire/compat";
import { environment } from '../environments/environment';







@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    WaitersComponent,
    ChefsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ShareModule,
    HttpClientModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
