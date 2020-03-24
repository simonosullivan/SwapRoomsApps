import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserCredentialsService } from '../services/UserCredentialsService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  addForm : FormGroup;
  token : any;
  password: any;
  verify: any;
  invalidLogin: boolean = false;

  constructor(private fb : FormBuilder, private apiService: UserCredentialsService, private router: Router) { }

  ngOnInit() {
    // if signed in, there will be a token
    this.token = window.localStorage.getItem('token');

    // if not signed in, redirected to login page
    if(!this.token){
      this.router.navigate(['Login']);
    } 




    this.addForm = this.fb.group({
     email: ['', Validators.required, Validators.email],
     password: ['', Validators.required],
     cpassword: ['', Validators.required],
    });

  }

  onSubmit(){
    if(this.addForm.invalid){
      return;
    }

     // get password values from form
     this.password = this.addForm.controls.password.value
     this.verify = this.addForm.controls.cpassword.value
 
     // compare password and verify_password
     if(this.password == this.verify){
       // Sending to values of the form to create a new user
        this.apiService.createUser(this.addForm.value)
        .subscribe(data=>{
          // once added, user gets redirect to home page
          this.router.navigate(['/']);
        })
      }else{
        this.invalidLogin = true;
      }

    
  }

 

}
