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


    this.apiService.getImages(this.userId).subscribe((data:any)=>{
      this.offer = data;
      this.image = 'http://35.246.80.226:80/Test_Login_SwapRms/fileUpload/'+this.offer.profPic+'/profPic.png';
      
    });

    // Gets info from account table in db
    this.apiService.getAccInfo(this.email).subscribe((data:any)=>{
      // display info on screen when comes back
      this.user = data[0];

      console.log(this.user);
      if(this.user.fname == null && this.user.lname == null && this.user.preferEmail == null){
        this.router.navigate(['setUpAccount']);
      }
      
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

   

    // setting validators for password
    this.changePass = this.fb.group({
      password: ['', Validators.required],
      verify_password: ['', Validators.required]
     })


  }

  onSubmit(){
    // get password values from form
    this.password = this.changePass.controls.password.value
    this.verify = this.changePass.controls.verify_password.value

    // compare password and verify_password
    if(this.password == this.verify){
      const userData = {
        email : this.email,
        password : this.password
      }

      this.apiService.changePassword(userData).subscribe((data:any)=>{
        // 
        this.message = data.message;

        this.changePass = this.fb.group({
          password : ['', Validators.required],
          verify_password : ['', Validators.required]
        })



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
  logout(){
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('userId');
    this.router.navigate(['Login']);
  }

  deleteAccount(){
    console.log(this.userId);
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
