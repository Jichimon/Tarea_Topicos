import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { TwoStepsCodeComponent } from './two-steps-code/two-steps-code.component';


@NgModule({
  declarations: [
    LoginComponent,
    SigninComponent,
    TwoStepsCodeComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule
  ],
  providers: [UserService, AuthService]
})
export class AuthModule { }
