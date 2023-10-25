import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetDataComponent } from './get-data/get-data.component';
import { WriteDataComponent } from './write-data/write-data.component';
import { GetCollectionsComponent } from './get-collections/get-collections.component';



@NgModule({
  declarations: [
    GetDataComponent,
    WriteDataComponent,
    GetCollectionsComponent
  ],
  imports: [
    CommonModule
  ],exports:[
    GetDataComponent,
    WriteDataComponent,
    GetCollectionsComponent
  ]
})
export class FirestoreModule { }
