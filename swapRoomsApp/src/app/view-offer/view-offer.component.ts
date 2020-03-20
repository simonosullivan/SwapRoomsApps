import { Component, OnInit } from '@angular/core';
import { UserCredentialsService } from '../services/UserCredentialsService';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-view-offer',
  templateUrl: './view-offer.component.html',
  styleUrls: ['./view-offer.component.css']
})
export class ViewOfferComponent implements OnInit {

  changePass : FormGroup;
  message: any;
  user: any;
  amenities: any;
  isHidden = true;
  email : any;
  password:any;
  verify: any;
  token: any;
  county: any;
  offers: any;

  constructor(private apiService: UserCredentialsService, private fb : FormBuilder, private router: Router) { }

  ngOnInit() {
    
    // if signed in, there will be a token
    this.token = window.localStorage.getItem('token');

    // if not signed in, redirected to login page
    if(!this.token){
      this.router.navigate(['Login']);
    } 

    // Get signed in email for all services
    this.email = window.localStorage.getItem('email');

    // Gets info from account table in db
    // this.apiService.getAccInfo(this.email).subscribe((data:any)=>{
    //   // display info on screen when comes back
    //   this.user = data;
    //   console.log(this.user);
    // });

    // gets info from county table in db 
    this.apiService.getCounty(this.email).subscribe((data:any)=>{
      // display info on screen when comes back
      this.county = data.county;
      console.log(this.county);

    });

    this.apiService.getOfferDetails(this.email).subscribe((data:any)=>{
      this.offers = data;
      console.log(this.offers);
    });

    
  }

}
