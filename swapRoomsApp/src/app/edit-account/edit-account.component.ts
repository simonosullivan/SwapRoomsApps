import { Component, OnInit } from '@angular/core';
import { UserCredentialsService } from '../services/UserCredentialsService';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  editAcc : FormGroup;
  message: any;
  user: any;
  amenities: any;
  email : any;
  password:any;
  verify: any;
  token: any;
  county: any;
  checked : any = false;
  previousCounty : any;
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
    this.apiService.getAccInfo(this.email).subscribe((data:any)=>{
      // display info on screen when comes back
      this.user = data;
    });

    // gets info from amenities table in db
    this.apiService.getAmenities(this.email).subscribe((data:any)=>{
      // display info on screen when comes back
      this.amenities = data;
    });

    

    // gets info from county table in db 
    this.apiService.getCounty(this.email).subscribe((data:any)=>{
      // display info on screen when comes back
      this.county = data.county;
      console.log(data.county);
      this.previousCounty = this.county;
    });

     // setting validators for password
    this.editAcc = this.fb.group({
      fname : '',
      lname : ['', Validators.required],
      email : '',
      preferEmail: '',
      titleRm : '',
      descripRm : '',
      addrRm : '',
      county : '',
      wifiCheck : '',
      cabletvCheck : '',
      ironCheck : '',
      tvCheck : '',
      essentialsCheck : '',
      washMachineCheck : '',
      heatCheck : '',
      laptopCheck : '',
      hotwaterCheck : '',
      freeparkCheck : '',
      kitchenCheck : '',
      stoveCheck : '',
      microwaveCheck : '',
      cookingCheck : '',
      fridgeCheck : '',
      dishesCheck : '',
      lockCheck : '',
      shampooCheck : '',
      hairdryerCheck : '',
      hangersCheck : '',
      entireplaceCheck : '',
      privateroomCheck : '',
      sharedroomCheck : '',
      doublebedCheck : '',
      singlebedCheck : ''

     });


  }

  onSubmit(){
    const dataForm = {
      formData : this.editAcc.value,
      previousCounty : this.previousCounty
    }

    this.apiService.editAccInfo(dataForm).subscribe(data =>{});
    this.router.navigate(['Account']);
    
  }

    

}
