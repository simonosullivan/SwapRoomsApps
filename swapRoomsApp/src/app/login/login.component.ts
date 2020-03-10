import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserCredentialsService} from '../services/user-credentials.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(private fb : FormBuilder, private user: UserCredentialsService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    })

  }

  onSubmit(){
    this.user.postData(this.loginForm.value).subscribe(
      data => console.log("Success", data),
      error => console.log("Error", error)
    )
  }

}
