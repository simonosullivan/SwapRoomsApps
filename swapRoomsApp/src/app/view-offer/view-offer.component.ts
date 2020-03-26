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

    // // gets info from county table in db 
    // this.apiService.getCounty(this.email).subscribe((data:any)=>{
    //   // display info on screen when comes back
    //   this.county = data.county;
    //   console.log(this.county);

    // });

    this.apiService.getOfferDetails(this.email).subscribe((data:any)=>{
      this.offers = data;
      console.log(this.offers);
    });


    
    

    
  }


  // Images List
  imageObject: Array<object> = [{
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
    thumbImage: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
        alt: 'alt of image',
    title: 'title of image'
}, {
    image: 'https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg', // Support base64 image
    thumbImage: 'https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg',
    alt: 'alt of image',
    title: 'Image alt' //Optional: You can use this key if want to show image with alt
},{
  image: 'https://www.bigstockphoto.com/images/homepage/module-6.jpg',
  thumbImage: 'https://www.bigstockphoto.com/images/homepage/module-6.jpg',
      alt: 'alt of image',
  title: 'title of image'
}
];

  createOfferLink(){
    this.router.navigate(['createOffer'])
  }

}
