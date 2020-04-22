import { Component ,OnInit} from '@angular/core';
import { UserCredentialsService } from '../app/services/UserCredentialsService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'swapRoomsApp';
  offer: any;
  image: string;
  userId: string;
  token: string;

  constructor(private apiService: UserCredentialsService){
    
  }

  ngOnInit() {

    // if signed in, there will be a token
    this.token = window.localStorage.getItem('token');
    
      // Get signed in email for all services
      this.userId = window.localStorage.getItem('userId');
          
    this.apiService.getImages(this.userId).subscribe((data:any)=>{
      this.offer = data;

      console.log(this.offer.profPic);

      this.image = 'http://35.246.80.226:80/Test_Login_SwapRms/fileUpload/'+this.offer.profPic+'/profPic.png';
      
    });


  }



  
  
}
