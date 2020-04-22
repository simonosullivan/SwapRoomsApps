import { Component, OnInit } from '@angular/core';
import { UserCredentialsService } from '../services/UserCredentialsService';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-notification-centre',
  templateUrl: './notification-centre.component.html',
  styleUrls: ['./notification-centre.component.css']
})
export class NotificationCentreComponent implements OnInit {

  isHidden = true;
  one = true;
  two = false;
  three = false;
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
  myFiles: any;
  offers: any;
  userId: string;
  notify: any;
  othersOffers: any;
  openOffersNull: boolean = false;
  pendingOffersNull: boolean = false;
  closedOffersNull: boolean = false;
  pendingNull: boolean;
  closedNull: boolean;
  image: string;
  offer: any;
  

  constructor( private apiService: UserCredentialsService, private fb : FormBuilder, private router: Router) { }

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


      this.image = 'http://35.246.80.226:80/Test_Login_SwapRms/fileUpload/'+this.offer.pathToImages+'rm1';
      
    });

    // Gets info from account table in db
    this.apiService.getNotifications(this.userId).subscribe((data:any)=>{
      // display info on screen when comes back
      this.offers = data;
      this.notify = this.offers;

      let openCnt = 0;
      let pendingCnt = 0;
      let closedCnt = 0;
      for(let i=0; i<this.offers.length; i++){
        if(this.offers[i]['status']== "open"){
          openCnt++;
        }
        else if(this.offers[i]['status']== "pending"){
          pendingCnt++;
        }
        else if(this.offers[i]['status']== "closed"){
          closedCnt++;
        }
      }

      if(openCnt == 0){
        this.openOffersNull = true;
      }
      if(pendingCnt == 0){
        this.pendingOffersNull = true;
      }
      if(closedCnt == 0){
        this.closedOffersNull = true;
      }
    });

    // Gets info from account table in db
    this.apiService.othersNotifications(this.email).subscribe((data:any)=>{
      // display info on screen when comes back
      this.othersOffers = data;
      
      let openCnt = 0;
      let pendingCnt = 0;
      let closedCnt = 0;
      console.log(this.offers.length);
      for(let i=0; i<this.offers.length; i++){
        
        if(this.othersOffers[i]['status']== "pending"){
          pendingCnt++;
        }
        else if(this.othersOffers[i]['status']== "closed"){
          closedCnt++;
        }
      }

     
      if(pendingCnt == 0){
        this.pendingNull = true;
      }
      if(closedCnt == 0){
        this.closedNull = true;
      }
    });


  }

  openNotification(acceptor, offerId){
    this.router.navigate(['viewDetailOffer/'+acceptor+'/'+offerId]);
  }

  editOffer(offerId){
    this.router.navigate(['createOffer/'+offerId])
  }

  oneTab(){
    this.two = false;
    this.one = true;
  }

  twoTab(){
    this.one =false;
    this.two = true;

  }

  
  

}
