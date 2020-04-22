import { Component, OnInit } from '@angular/core';
import { UserCredentialsService } from '../services/UserCredentialsService';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-set-up-account',
  templateUrl: './set-up-account.component.html',
  styleUrls: ['./set-up-account.component.css']
})
export class SetUpAccountComponent implements OnInit {
  editAcc : FormGroup;
  amenitiesForm : FormGroup;
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
  myFiles: any[]=[];
  room: any;
  profPic: string | Blob;
  userId: string;

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
    this.userId = window.localStorage.getItem('userId');
    
    // Gets info from account table in db
    this.apiService.getAccInfo(this.email).subscribe((data:any)=>{
      // display info on screen when comes back
      this.user = data[0];
      console.log(this.user);

      this.apiService.getRoom(this.user.userId).subscribe((data:any)=>{
        // display info on screen when comes back
        this.room = data[0];
        console.log(this.room);

        // // gets info from amenities table in db
        this.apiService.getAmenities(this.room.rmId).subscribe((data:any)=>{
          // display info on screen when comes back
          this.amenities = data;
        });

      });

    });


     // setting validators for password
    this.editAcc = this.fb.group({
      fname : ['', Validators.required],
      lname : ['', Validators.required],
      email : '',
      preferEmail: ['', Validators.required],
      titleRm : ['', Validators.required],
      descripRm : ['', Validators.required],
      addrRm : ['', Validators.required],
      county : ['', Validators.required],
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
  

  onFileSelect(event){
    for(let i=0; i < (event.target.files.length); i++){
       this.myFiles[i+1] = event.target.files[i];
    }

    console.log(this.myFiles);
    
  }

  profPicSelect(event){
    this.myFiles[0] = event.target.files[0];
  }

  onSubmit(){

    if(this.editAcc.invalid){
      return;
    }

    const sqlImages = new FormData();

    sqlImages.append('userId', this.userId);
    sqlImages.append('email', this.email);
    sqlImages.append('fileUpload[]', this.profPic);

    for(let i=0; i < this.myFiles.length; i++){
      sqlImages.append('fileUpload[]', this.myFiles[i]);
    }
   
    this.apiService.uploadImages(sqlImages).subscribe((data:any)=>{
      this.message = data.message;
      console.log(this.message);
    });


    const dataForm = {
      formData : this.editAcc.value,
      userId: this.user.userId
    }

    console.log(dataForm);

    this.apiService.submitAmenities(dataForm).subscribe((data:any) =>{
      this.message = data.message
      console.log(this.message);
    });
    if(this.message != "Failed to set up account"){
      this.router.navigate(['Account']);
    }
    
  }


}
