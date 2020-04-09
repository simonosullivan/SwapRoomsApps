import { Component, OnInit } from '@angular/core';
import { UserCredentialsService } from '../services/UserCredentialsService';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-view-offer',
  templateUrl: './view-offer.component.html',
  styleUrls: ['./view-offer.component.css']
})
export class ViewOfferComponent implements OnInit {

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
  offers: any;
  filteredOffers: any;
  private _searchTerm: string;
  userId: string;
  get searchTerm():string{
    return this._searchTerm;
  }
  set searchTerm(value:string){
    this._searchTerm = value;
    this.filteredOffers = this.filterOffers(value);
  }

  filterOffers(searchString: string){
    return this.offers.filter(offer => offer.county.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  constructor(private apiService: UserCredentialsService, private fb : FormBuilder, private router: Router) { }

  ngOnInit() {
    
    // if signed in, there will be a token
    this.token = window.localStorage.getItem('token');

    // if not signed in, redirected to login page
    if(!this.token){
      this.router.navigate(['Login']);
    } 

    // Get signed in email for all services
    this.userId = window.localStorage.getItem('userId');

    

    this.apiService.getOfferDetails(this.userId).subscribe((data:any)=>{
      this.offers = data;
      this.filteredOffers = this.offers;
      console.log(this.offers);
      if(this.offers.length == 0){
        this.message = "There are no open offers. Try again later";
      }
    });
    
  }


  createOfferLink(){
    this.router.navigate(['createOffer'])
  }

  seeDetails(userId, offerId){
    this.router.navigate(['detailedOffer/'+userId+'/'+offerId]);
  }

}
