import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserCredentialsService } from '../services/user-credentials.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  addForm : FormGroup;

  constructor(private fb : FormBuilder, private apiService: UserCredentialsService, private router: Router) { 
    
  }

  ngOnInit() {
    this.addForm = this.fb.group({
     username: ['', Validators.required],
     password: ['', Validators.required],
     firstName: ['', Validators.required],
     lastName: ['', Validators.required]
    })

  }

  onSubmit(){
    this.apiService.createUser(this.addForm.value)
    .subscribe(data=>{
      this.router.navigate(['/']);
    })
  }

}
