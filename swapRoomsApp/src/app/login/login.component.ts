import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserCredentialsService} from '../services/user-credentials.service';
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
  

  constructor(private fb : FormBuilder, private router: Router , private apiService: UserCredentialsService) { }

  ngOnInit() {
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
    username : this.loginForm.controls.username.value,
    password : this.loginForm.controls.password.value
   };

   this.apiService.login(loginData).subscribe((data:any)=> {
    this.message = data.message;
    if(data.token){
      window.localStorage.setItem('token', data.token);
    }else{
      this.invalidLogin = true;
    }
   });

  }

}
