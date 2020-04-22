import { Component, OnInit } from '@angular/core';
import { UserCredentialsService } from '../services/UserCredentialsService';
import {Router, Params, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-details-offer',
  templateUrl: './details-offer.component.html',
  styleUrls: ['./details-offer.component.css']
})
export class DetailsOfferComponent implements OnInit {

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
  rmId: any;

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
    console.log(this.routeParams.id);
 
     // Get signed in email for all services
     this.email = window.localStorage.getItem('email');
     this.userId = window.localStorage.getItem('userId');
 
    
 
     this.apiService.getOfferDetails(this.userId).subscribe((data:any)=>{
       this.offers = data;

       for(let i=0; i<this.offers.length; i++){
        if(this.routeParams.id == this.offers[i].userId){
         this.offer = this.offers[i];

          // gets info from amenities table in db
        this.apiService.getAmenities(this.offer.rmId).subscribe((data:any)=>{
          // display info on screen when comes back
          this.amenities = data[0];  
        });

         // Image list
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
         break;
        }
      }
     });

  
        

    
 
  }

  
  acceptOffer(){
    this.apiService.changeStatusOffer(this.routeParams.id, "accept", this.email, this.routeParams.offerId).subscribe((data:any)=>{
      this.message = data.message; 
      if(this.message != "Failed"){
        this.router.navigate(['viewOffer']);
      }
    });
  }

}
