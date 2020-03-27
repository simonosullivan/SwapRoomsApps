import { Component, OnInit } from '@angular/core';
import { UserCredentialsService } from '../services/UserCredentialsService';
import {Router, Params, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiResponseComponent } from '../Model/api-response/api-response.component';

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
 
    
 
     this.apiService.getOfferDetails(this.email).subscribe((data:any)=>{
       this.offers = data;

       for(let i=0; i<this.offers.length; i++){
        if(this.routeParams.email == this.offers[i].email){
         this.offer = this.offers[i];

         // Image list
         this.imageObject = [{
          image: 'http://localhost:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'/rm1',
          thumbImage: 'http://localhost:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'/rm1'
         },{
          image: 'http://localhost:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'/rm2', 
          thumbImage: 'http://localhost:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'/rm2'
          },{
          image: 'http://localhost:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'/rm3',
          thumbImage: 'http://localhost:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'/rm3'
          },{
          image: 'http://localhost:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'/rm4',
          thumbImage: 'http://localhost:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'/rm4'
          },{
          image: 'http://localhost:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'/rm5',
          thumbImage: 'http://localhost:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'/rm5'
          },{
          image: 'http://localhost:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'/rm6',
          thumbImage: 'http://localhost:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'/rm6'
          },{
          image: 'http://localhost:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'/rm7',
          thumbImage: 'http://localhost:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'/rm7'
          },{
          image: 'http://localhost:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'/rm8',
          thumbImage: 'http://localhost:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'/rm8'
          },{
          image: 'http://localhost:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'/rm9',
          thumbImage: 'http://localhost:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'/rm9'
          },{
          image: 'http://localhost:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'/rm10',
          thumbImage: 'http://localhost:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'/rm10'
          }];
         break;
        }
      }
     });

     // gets info from amenities table in db
    this.apiService.getAmenities(this.routeParams.email).subscribe((data:any)=>{
      // display info on screen when comes back
      this.amenities = data;  
    });
 
  }

  
  acceptOffer(){
    console.log("in acceptOffer method");
    // gets info from amenities table in db
    this.apiService.changeStatusOffer(this.routeParams.email).subscribe((data:any)=>{
      // display info on screen when comes back
      this.message = data.message;  
      console.log(this.message);
    });
  }

}
