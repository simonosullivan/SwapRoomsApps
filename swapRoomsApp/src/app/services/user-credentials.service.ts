import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Observable, from } from 'rxjs';
import {UserComponent} from '../Model/user/user.component';
import {ApiResponseComponent} from '../Model/api-response/api-response.component';


@Injectable({
  providedIn: 'root'
})
export class UserCredentialsService {

  url = 'http://localhost/Test_Login_SwapRms/';

  constructor(private http: HttpClient) { }

  postData(user: FormGroup):Observable<any>{
    return this.http.post<any>(this.url+'UserCredentials.php', user.value);
  }

  createUser(user: UserComponent): Observable<ApiResponseComponent>{
    return this.http.post<ApiResponseComponent>(this.url+'UserCredentials.php', user);
  }


}
