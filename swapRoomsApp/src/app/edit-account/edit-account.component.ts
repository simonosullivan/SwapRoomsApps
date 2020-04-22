import { Component, OnInit } from '@angular/core';
import { UserCredentialsService } from '../services/UserCredentialsService';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { empty } from 'rxjs';

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
  myFiles: any[]=[];
  room: any;
  profPic: any;
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

      this.apiService.getRoom(this.user.userId).subscribe((data:any)=>{
        // display info on screen when comes back
        this.room = data[0];

        // // gets info from amenities table in db
        this.apiService.getAmenities(this.room.rmId).subscribe((data:any)=>{
          // display info on screen when comes back
          this.amenities = data[0];
        });

      });

    });

    

    
    

    // // gets info from county table in db 
    // this.apiService.getCounty(this.email).subscribe((data:any)=>{
    //   // display info on screen when comes back
    //   this.county = data.county;
    //   console.log(data.county);
    //   this.previousCounty = this.county;
    // });

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

  onFileSelect(event){
    for(let i=0; i < (event.target.files.length); i++){
       this.myFiles[i+1] = event.target.files[i];
    }
    if(this.myFiles[0] == null){
      this.myFiles[0]= null;
    }

    console.log(this.myFiles);
    
  }

  profPicSelect(event){
    this.myFiles[0] = event.target.files[0];
    if(this.myFiles == null){
      console.log("null");
    }
  }

  onSubmit(){

    const sqlImages = new FormData();

    sqlImages.append('userId', this.userId);
    sqlImages.append('email', this.email);
    sqlImages.append('fileUpload[]', this.myFiles[0]);

    for(let i=1; i < this.myFiles.length; i++){
      sqlImages.append('fileUpload[]', this.myFiles[i]);
    }

    // const sqlImages= ({
    //   userId: this.userId,
    //   email : this.email,
    //   fileUpload : this.myFiles
    // });
    // console.log(sqlImages);
   
    //console.log(sqlImages);
    this.apiService.uploadImages(sqlImages).subscribe((data:any)=>{
      this.message = data.message;
      //console.log(this.message);
    });



    const dataForm = {
      formData : this.editAcc.value,
      userId: this.user.userId,
      rmId: this.room.rmId
    }

    console.log(dataForm);

    this.apiService.editAccInfo(dataForm).subscribe((data:any) =>{
      this.message = data.message
      console.log(this.message);
    });
    this.router.navigate(['Account']);
    
  }

    

}
