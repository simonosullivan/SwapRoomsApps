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

  constructor(private fb : FormBuilder, private apiService: UserCredentialsService, private router: Router) { }

  ngOnInit() {
    // if signed in, there will be a token
    this.token = window.localStorage.getItem('token');

    // if not signed in, redirected to login page
    if(!this.token){
      this.router.navigate(['Login']);
    } 

    this.addForm = this.fb.group({
     username: ['', Validators.required],
     password: ['', Validators.required],
     firstName: ['', Validators.required],
     lastName: ['', Validators.required]
    })

  }

  onSubmit(){
    // Sending to values of the form to create a new user
    this.apiService.createUser(this.addForm.value)
    .subscribe(data=>{
      // once added, user gets redirect to home page
      this.router.navigate(['/']);
    })
  }

  // To logout 
  logout(){
    window.localStorage.removeItem('token');
    this.router.navigate(['Login']);
  }

}
