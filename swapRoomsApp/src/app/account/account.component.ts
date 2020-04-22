import { Component, OnInit } from '@angular/core';
import { UserCredentialsService } from '../services/UserCredentialsService';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


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
  room: any;
  userId: string;
  offer: any;
  image: string;
  show = true;
  constructor(private apiService: UserCredentialsService, private fb : FormBuilder, private router: Router) { }

  ngOnInit() {
    
    // if signed in, there will be a token
    this.token = window.localStorage.getItem('token');

    // if not signed in, redirected to login page
    if(!this.token){
      this.router.navigate(['Login']);
    } 

    // Get signed in email and userId for services
    this.email = window.localStorage.getItem('email');
    this.userId = window.localStorage.getItem('userId');

    // Get images for profile pic at top of page
    this.apiService.getImages(this.userId).subscribe((data:any)=>{
      this.offer = data;
      this.image = 'http://35.246.80.226:80/Test_Login_SwapRms/fileUpload/'+this.offer.profPic+'/profPic.png';
      
    });

    // Gets info from account table in db
    this.apiService.getAccInfo(this.email).subscribe((data:any)=>{
      // display info on screen when comes back
      this.user = data[0];

      // If these attributes are null = first time logging in
      if(this.user.fname == null && this.user.lname == null && this.user.preferEmail == null){
        this.router.navigate(['setUpAccount']); // send to set up account
      }
      
      // with the userId , can now get room details
      this.apiService.getRoom(this.user.userId).subscribe((data:any)=>{
        // display info on screen when comes back
        this.room = data[0];

        // with room id get amenities
        this.apiService.getAmenities(this.room.rmId).subscribe((data:any)=>{
          // display info on screen when comes back
          this.amenities = data[0];
        });

      });

  
    }); // nest service calls as they are dependent on each other

   

    // setting validators for password
    this.changePass = this.fb.group({
      password: ['', Validators.required],
      verify_password: ['', Validators.required]
     })


  }

  onSubmit(){
    if(this.changePass.invalid){ // if not filled, its invalid and won't submit
      return;
    }

    // get password values from form
    this.password = this.changePass.controls.password.value
    this.verify = this.changePass.controls.verify_password.value

    // compare password and verify_password
    if(this.password == this.verify){ // if the same, send to change the password
      const userData = {
        email : this.email,
        password : this.password
      }

      this.apiService.changePassword(userData).subscribe((data:any)=>{
        this.message = data.message; // display on screen so user knows password has changed
      }); 

      
    }
    else{
      this.message = "Passwords do not match! Please try again"
    }
  }

  edit(){ 
    this.router.navigate(['editAccount']);
  }
    

  // To logout 
  logout(){ // remove all items from local storage and redirect to login
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('userId');
    this.router.navigate(['Login']);
  }

  // Use cascade delete in db, delete user and delete in all tables
  deleteAccount(){ 
    this.apiService.deleteAcc(this.userId).subscribe((data:any)=>{
      this.message = data.message;

      if(this.message == "Deleted Account"){
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('userId');
        this.router.navigate(['/']);
      }
    });
  }





}
