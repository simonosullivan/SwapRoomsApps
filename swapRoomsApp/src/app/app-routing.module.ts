import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OpeningPageComponent} from './opening-page/opening-page.component'
import {LoginComponent} from './login/login.component'
import {SignUpComponent} from './sign-up/sign-up.component'
import {AccountComponent} from './account/account.component'
import {EditAccountComponent} from './edit-account/edit-account.component';
import {CreateOfferComponent} from './create-offer/create-offer.component';
import {ViewOfferComponent} from './view-offer/view-offer.component';
import {DetailsOfferComponent} from './details-offer/details-offer.component';
import {NotificationCentreComponent} from './notification-centre/notification-centre.component';
import {ViewDetailOfferComponent} from './view-detail-offer/view-detail-offer.component';
import {SetUpAccountComponent} from './set-up-account/set-up-account.component';

const routes: Routes = [
  { path: '', component: OpeningPageComponent },  // sign up will be home page
  { path: 'Login', component:  LoginComponent},
  {path : 'Sign-Up', component: SignUpComponent},
  {path: 'Account', component : AccountComponent},
  {path: 'editAccount', component: EditAccountComponent},
  {path: 'createOffer', component: CreateOfferComponent},
  {path: 'viewOffer', component: ViewOfferComponent},
  {path: 'detailedOffer/:id/:offerId', component: DetailsOfferComponent},
  {path: 'Notifications', component: NotificationCentreComponent},
  {path: 'viewDetailOffer/:email/:offerId', component: ViewDetailOfferComponent},
  {path: 'setUpAccount', component: SetUpAccountComponent},
  {path: 'createOffer/:offerId', component: CreateOfferComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [OpeningPageComponent, LoginComponent, SignUpComponent, 
  AccountComponent, EditAccountComponent, CreateOfferComponent, ViewOfferComponent, DetailsOfferComponent,
   NotificationCentreComponent, ViewDetailOfferComponent, SetUpAccountComponent]
