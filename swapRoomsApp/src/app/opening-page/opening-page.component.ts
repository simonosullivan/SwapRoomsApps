import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-opening-page',
  templateUrl: './opening-page.component.html',
  styleUrls: ['./opening-page.component.css']
})
export class OpeningPageComponent implements OnInit {
  token: string;

  constructor(private router: Router) { }

  ngOnInit() {
    // if signed in, there will be a token
    this.token = window.localStorage.getItem('token');
    
    if(this.token){
      this.router.navigate(['/Account']);
    }
  }

}
