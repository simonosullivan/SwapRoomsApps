import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserComponent } from '../Model/user/user.component';
import { ApiResponseComponent } from '../Model/api-response/api-response.component';
@Injectable({
  providedIn: 'root'
})
export class UserCredentialsService {
  url = 'http://localhost/Test_Login_SwapRms/';
  constructor(private http: HttpClient) { }

  // Login
  login(loginData): Observable<ApiResponseComponent> {
    return this.http.post<ApiResponseComponent>(this.url + 'login.php', loginData);
  }

  // Register / Sign-up
  createUser(user: UserComponent): Observable<ApiResponseComponent> {
    return this.http.post<ApiResponseComponent>(this.url + 'register.php', user);
  }

  // Account get info
  getAccInfo(email): Observable<ApiResponseComponent> {
    return this.http.get<ApiResponseComponent>(this.url+ 'account.php?email='+email);
  }

  // Account get info
  getAmenities(email): Observable<ApiResponseComponent> {
    return this.http.get<ApiResponseComponent>(this.url+ 'getAmenities.php?email='+email);
  }

  // get county
  getCounty(email): Observable<ApiResponseComponent> {
    return this.http.get<ApiResponseComponent>(this.url+ 'getCounty.php?email='+email);
  }

  //Change Password
  changePassword(userData) : Observable<ApiResponseComponent>{
    return this.http.post<ApiResponseComponent>(this.url + 'changepassword.php', userData);
  }
}
