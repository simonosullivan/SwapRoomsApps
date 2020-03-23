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
    ViewOfferComponent
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
    MatInputModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
