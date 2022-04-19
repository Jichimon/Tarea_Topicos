import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { TwoStepsCodeComponent } from './two-steps-code/two-steps-code.component';

const routes: Routes = [

  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'signin',
    component: SigninComponent
  },
  {
    path:'confirm-register',
    component: TwoStepsCodeComponent
  },
  {
    path:'**',
    redirectTo:'login'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
