import { Component, OnInit } from '@angular/core';
import { UserCredentialsService } from '../services/UserCredentialsService';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';


@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {

  createOffer : FormGroup;
  message: any;
  email : any;
  token: any;
  county: any;
  user: any;

  minDate: Date;
  maxDate: Date;
  start = new FormControl(new Date());


  constructor(private apiService: UserCredentialsService, private fb : FormBuilder, private router: Router) { 
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

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
    this.apiService.getAccInfo(this.email).subscribe((data:any)=>{
      // display info on screen when comes back
      this.user = data;
    });

    // gets info from county table in db 
    this.apiService.getCounty(this.email).subscribe((data:any)=>{
      // display info on screen when comes back
      this.county = data.county;
      console.log(this.county);
    });

    // Creating the form group
    this.createOffer = this.fb.group({
      option1: '',
      option2: '',
      option3: '',
      start: '',
      end: ''
     })


    

  }

  onSubmit(){
      const offerData = {
        email : this.email,
        option1: this.createOffer.controls.option1.value,
        option2: this.createOffer.controls.option2.value,
        option3: this.createOffer.controls.option3.value,
        start: this.createOffer.controls.start.value,
        end: this.createOffer.controls.end.value
      }

      this.apiService.createOffer(offerData).subscribe((data:any)=>{
        this.message = data.message;
        this.router.navigate(['viewOffer']);
      });
  }

}