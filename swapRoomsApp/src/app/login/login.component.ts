import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserCredentialsService } from "../services/UserCredentialsService";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  invalidLogin: boolean = false;
  message: any;
  
  // inject into contrustor so they can be utilised 
  constructor(private fb : FormBuilder, private router: Router , private apiService: UserCredentialsService) { }

  ngOnInit() {
    // When page loads, empty the fields username & password
   this.loginForm = this.fb.group({
     username: ['', Validators.compose([Validators.required])],
     password: ['', Validators.required]
   });

  }

  onSubmit(){
   if(this.loginForm.invalid){
     return;
   }

   const loginData = {
     // Get the values from the login form using a form-group
    email : this.loginForm.controls.username.value,
    password : this.loginForm.controls.password.value
   };

   this.apiService.login(loginData).subscribe((data:any)=> { 
    // send loginData and subscribe to get the confirmation of a successful sign in
    this.message = data.message; 
    
    //gets token and stores in local Storage                          
    if(data.token){
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('email', data.email);
      this.router.navigate(['Account']);
    }else{
      this.invalidLogin = true;
    }
   });

  

  }

}
