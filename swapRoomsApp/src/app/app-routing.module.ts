import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OpeningPageComponent} from './opening-page/opening-page.component'
import {LoginComponent} from './login/login.component'
import {SignUpComponent} from './sign-up/sign-up.component'
import {AccountComponent} from './account/account.component'
import {EditAccountComponent} from './edit-account/edit-account.component';

const routes: Routes = [
  { path: '', component: OpeningPageComponent },  // sign up will be home page
  { path: 'Login', component:  LoginComponent},
  {path : 'Sign-Up', component: SignUpComponent},
  {path: 'Account', component : AccountComponent},
  {path: 'editAccount', component: EditAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [OpeningPageComponent, LoginComponent, SignUpComponent, 
  AccountComponent, EditAccountComponent]
