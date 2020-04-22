import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { UserCredentialsService } from '../services/UserCredentialsService';
import {Router, Params, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl, NgModel} from '@angular/forms';


@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})

export class CreateOfferComponent implements OnInit {
  @ViewChild('start') start: ElementRef;
  createOffer : FormGroup;
  message: any;
  email : any;
  token: any;
  county: any;
  user: any;
  myFiles: string [] = [];
  profPic: any;
  userId: string;
  room: any;
  today: any;
  endMinDate: string;
  endMaxDate: string;
  startMinDate: string;
  startMaxDate: string;
  startVal: string;
  endVal: string;
  routeParams: Params;
  myOffer: any;



  constructor(private apiService: UserCredentialsService, private fb : FormBuilder, private router: Router,
    private routes:ActivatedRoute) { }
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

    this.routeParams = this.routes.snapshot.params;


    this.apiService.getMyOffer(this.routeParams.offerId).subscribe((data:any)=>{
      // display info on screen when comes back
      this.myOffer = data;
      console.log(this.myOffer);
    });

    // Gets info from account table in db
    this.apiService.getAccInfo(this.email).subscribe((data:any)=>{
      // display info on screen when comes back
      this.user = data[0];
      

      this.apiService.getRoom(this.user.userId).subscribe((data:any)=>{
        this.room = data[0];
      });
    });


    

    // Creating the form group
    this.createOffer = this.fb.group({
      option1: '',
      option2: '',
      option3: '',
      start: '',
      end: ''
     })

     
     

     this.today = new Date();
     let date = this.today.getDate();
     let dd = (date < 10 ? ('0' + String(date)) : String(date));
     let month = this.today.getMonth()+1;
     let mm = (month < 10 ? ('0' + String(month)) : String(month));
     let yyyy = this.today.getFullYear();
     let year1 = yyyy+1;

     this.startMinDate = yyyy+"-"+mm+"-"+dd;
     this.today = this.startMinDate;
     this.startMaxDate = year1+"-"+mm+"-"+dd;
     


     //dd = String(Number(dd)+1);
     
     this.endMinDate = this.startMinDate;
    
     this.endMaxDate = this.startMaxDate;
     //console.log(this.maxDate);
    

  }

  onChangeStartDate(event){
    //console.log(event); startMinDate 2020-04-23
    if(this.myOffer.endDate <= event){
      let datePicked = new Date(event);
      let date = datePicked.getDate()+1;
      let dd = (date < 10 ? ('0' + String(date)) : String(date));
      let month = datePicked.getMonth()+1;
      let mm = (month < 10 ? ('0' + String(month)) : String(month));
      let yyyy = datePicked.getFullYear();
      let year1 = yyyy+1;

      this.myOffer.endDate = yyyy+"-"+mm+"-"+dd;
      this.endMaxDate = year1+"-"+mm+"-"+dd;
    }
    

    
  }

  

  onSubmit(){
    if(this.myOffer.startDate < this.today || this.myOffer.endDate < this.today){
      this.message = "One or both of the dates are in the past. Please enter valid dates.";
      return 
    }else{

      let offerId;
      if(this.routeParams.offerId == null){
        offerId = null;
      }else{
        offerId = this.routeParams.offerId;
      }

      const offerData = {
        offerId: offerId,
        userId : this.userId,
        option1: this.createOffer.controls.option1.value,
        option2: this.createOffer.controls.option2.value,
        option3: this.createOffer.controls.option3.value,
        start: this.createOffer.controls.start.value,
        end: this.createOffer.controls.end.value
      }

      console.log(offerData);

      this.apiService.createOffer(offerData).subscribe((data:any)=>{
        this.message = data.message;
        console.log(this.message);
        this.router.navigate(['viewOffer']);
      });
    }

      
  }

}
