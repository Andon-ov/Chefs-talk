import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimestampFormatPipe } from '../shared/timestamp-format.pipe/timestamp-format.pipe';



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    TimestampFormatPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    
    
  ]
})
export class AuthModule { }
