import { Component, OnInit } from '@angular/core';
import { UserCredentialsService } from '../services/UserCredentialsService';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';


@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {

  createOffer : FormGroup;
  message: any;
  email : any;
  token: any;
  county: any;
  user: any;
  myFiles: string [] = [];
  profPic: any;



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

    // gets info from county table in db 
    this.apiService.getCounty(this.email).subscribe((data:any)=>{
      // display info on screen when comes back
      this.county = data.county;
      console.log(this.county);
    });

    // Creating the form group
    this.createOffer = this.fb.group({
      option1: '',
      option2: '',
      option3: '',
      start: '',
      end: ''
     })

     

    

  }

  // onFileSelect(event){
    
  //   for(let i=1; i <= (event.target.files.length); i++){
  //      this.myFiles.push(event.target.files[i]);
  //   }
  //   console.log(this.myFiles);
  // }

  // profPicSelect(event){
  //   this.myFiles.push(event.target.files[0]);
  // }

  onSubmit(){

    // const sqlImages = new FormData();

    // sqlImages.append('email', this.email);
    // sqlImages.append('fileUpload[]', this.myFiles[0]);

    // for(let i=1; i <= this.myFiles.length; i++){
    //   sqlImages.append('fileUpload[]', this.myFiles[i]);
    // }

    // console.log(sqlImages);
    
    // this.apiService.uploadImages(sqlImages).subscribe((data:any)=>{
    //   this.message = data.message;
    //   console.log(this.message);
    // });



    const offerData = {
      email : this.email,
      option1: this.createOffer.controls.option1.value,
      option2: this.createOffer.controls.option2.value,
      option3: this.createOffer.controls.option3.value,
      start: this.createOffer.controls.start.value,
      end: this.createOffer.controls.end.value
    }

    this.apiService.createOffer(offerData).subscribe((data:any)=>{
      this.message = data.message;
      this.router.navigate(['viewOffer']);
    });

      
  }

}
