import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpeningPageComponent } from './opening-page/opening-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { UserComponent } from './Model/user/user.component';
import { ApiResponseComponent } from './Model/api-response/api-response.component';
import { AccountComponent } from './account/account.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { ViewOfferComponent } from './view-offer/view-offer.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { DetailsOfferComponent } from './details-offer/details-offer.component';
import { NotificationCentreComponent } from './notification-centre/notification-centre.component';
import { ViewDetailOfferComponent } from './view-detail-offer/view-detail-offer.component';
import { SetUpAccountComponent } from './set-up-account/set-up-account.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    OpeningPageComponent,
    LoginComponent,
    SignUpComponent,
    UserComponent,
    ApiResponseComponent,
    AccountComponent,
    EditAccountComponent,
    CreateOfferComponent,
    ViewOfferComponent,
    DetailsOfferComponent,
    NotificationCentreComponent,
    ViewDetailOfferComponent,
    SetUpAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    NgImageSliderModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
