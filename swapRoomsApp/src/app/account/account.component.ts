import { Component, OnInit } from '@angular/core';
import { UserCredentialsService } from '../services/UserCredentialsService';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { __await } from 'tslib';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

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
    });

    // setting validators for password
    this.changePass = this.fb.group({
      password: ['', Validators.required],
      verify_password: ['', Validators.required]
     })


  }

  onSubmit(){
    // get password values from form
    this.password = this.changePass.controls.password.value
    this.verify = this.changePass.controls.verify_password.value

    // compare password and verify_password
    if(this.password == this.verify){
      const userData = {
        email : this.email,
        password : this.password
      }

      this.apiService.changePassword(userData).subscribe((data:any)=>{
        // 
        this.message = data.message;
        console.log(this.message);

        this.changePass = this.fb.group({
          password : ['', Validators.required],
          verify_password : ['', Validators.required]
        })



      }); 

      
    }
    else{
      this.message = "Passwords do not match! Please try again"
    }
  }

  edit(){
    this.router.navigate(['Sign-Up']);
  }
    

    





}
