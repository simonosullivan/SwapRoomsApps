import { Component, OnInit } from '@angular/core';
import { UserCredentialsService } from '../services/UserCredentialsService';
import {Router, Params, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-view-detail-offer',
  templateUrl: './view-detail-offer.component.html',
  styleUrls: ['./view-detail-offer.component.css']
})
export class ViewDetailOfferComponent implements OnInit {

  message: any;
  user: any;
  amenities: any;
  isHidden = true;
  email : any;
  password:any;
  verify: any;
  token: any;
  county: any;
  offers: any;
  routeParams: Params;
  offer: any;
  imageObject: Array<Object>;
  userId: string;
  room: any;

   constructor(private apiService: UserCredentialsService, private fb : FormBuilder, 
    private router: Router, private routes:ActivatedRoute) { }

  ngOnInit() {
    // if signed in, there will be a token
    this.token = window.localStorage.getItem('token');

    // if not signed in, redirected to login page
    if(!this.token){
      this.router.navigate(['Login']);
    } 

   this.routeParams = this.routes.snapshot.params;

    // Get signed in email for all services
    this.email = window.localStorage.getItem('email');
    this.userId = window.localStorage.getItem('userId');

    // Gets info from account table in db
    this.apiService.getAccInfo(this.routeParams.email).subscribe((data:any)=>{
      // display info on screen when comes back
      this.user = data[0];

      // call getRoom and fix getAmenities
      this.apiService.getRoom(this.user.userId).subscribe((data:any)=>{
        this.room = data[0];

        // gets info from amenities table in db
        this.apiService.getAmenities(this.room.rmId).subscribe((data:any)=>{
          // display info on screen when comes back
          this.amenities = data[0];
          
        });
      });


      this.apiService.getImages(this.user.userId).subscribe((data:any)=>{
        this.offer = data;

        this.imageObject = [{
          image: 'http://35.246.80.226/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm1',
          thumbImage: 'http://35.246.80.226/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm1'
        },{
          image: 'http://35.246.80.226/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm2', 
          thumbImage: 'http://35.246.80.226/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm2'
          },{
          image: 'http://35.246.80.226/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm3',
          thumbImage: 'http://35.246.80.226/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm3'
          },{
          image: 'http://35.246.80.226/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm4',
          thumbImage: 'http://35.246.80.226/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm4'
          },{
          image: 'http://35.246.80.226/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm5',
          thumbImage: 'http://35.246.80.226/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm5'
          },{
          image: 'http://35.246.80.226/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm6',
          thumbImage: 'http://35.246.80.226/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm6'
          },{
          image: 'http://35.246.80.226/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm7',
          thumbImage: 'http://35.246.80.226/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm7'
          },{
          image: 'http://35.246.80.226/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm8',
          thumbImage: 'http://35.246.80.226/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm8'
          },{
          image: 'http://35.246.80.226/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm9',
          thumbImage: 'http://35.246.80.226/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm9'
          },{
          image: 'http://35.246.80.226/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm10',
          thumbImage: 'http://35.246.80.226/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm10'
          }];
         
      });


    });


  }

  acceptOffer(){
    this.apiService.changeStatusOffer(this.userId, "accept", this.user.email, this.routeParams.offerId).subscribe((data:any)=>{
      // display info on screen when comes back
      this.message = data.message;  
      if(this.message != "You are not the offer owner" && this.message !="This offer is already closed."){
        this.router.navigate(['/Notifications']);
      }
     
    });
  }

  rejectOffer(){
    this.apiService.changeStatusOffer(this.userId, "reject", this.user.email, this.routeParams.offerId).subscribe((data:any)=>{
      // display info on screen when comes back
      this.message = data.message;  
      if(this.message != "You are not the offer owner" && this.message !="This offer is already closed."){
        this.router.navigate(['/Notifications']);
      }
    });
  }

}
