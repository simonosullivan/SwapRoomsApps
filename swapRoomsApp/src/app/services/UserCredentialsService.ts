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
    return this.http.post<ApiResponseComponent>(this.url + 'login.php', loginData);//
  }

  // Register / Sign-up
  createUser(user: UserComponent): Observable<ApiResponseComponent> {
    return this.http.post<ApiResponseComponent>(this.url + 'register.php', user);//
  }

  // Account get info
  getAccInfo(email): Observable<ApiResponseComponent> {
    return this.http.get<ApiResponseComponent>(this.url+ 'account.php?email='+email);//
  }

  getRoom(userId): Observable<ApiResponseComponent> {
    return this.http.get<ApiResponseComponent>(this.url+ 'getRoom.php?id='+userId);//
  }


  // Account get info
  getAmenities(rmId): Observable<ApiResponseComponent> {
    return this.http.get<ApiResponseComponent>(this.url+ 'getAmenities.php?id='+rmId);//
  }

  // get county
  getCounty(email): Observable<ApiResponseComponent> {
    return this.http.get<ApiResponseComponent>(this.url+ 'getCounty.php?email='+email);//
  }

  //Change Password
  changePassword(userData) : Observable<ApiResponseComponent>{
    return this.http.post<ApiResponseComponent>(this.url + 'changepassword.php', userData);//
  }

  // Edit Account info
  editAccInfo(userInfo): Observable<ApiResponseComponent>{
    return this.http.post<ApiResponseComponent>(this.url + 'editAccount.php', userInfo);//
  }

  submitAmenities(form):Observable<ApiResponseComponent>{
    return this.http.post<ApiResponseComponent>(this.url + 'submitAmenities.php', form);// insert account info
  }

  //Create Offer
  createOffer(offerData) : Observable<ApiResponseComponent>{
    return this.http.post<ApiResponseComponent>(this.url + 'createOffer.php', offerData);
  }

  //Create Offer
  uploadImages(sqlImages) : Observable<ApiResponseComponent>{
    console.log(sqlImages);
    return this.http.post<ApiResponseComponent>(this.url + 'fileUpload/uploadImages.php', sqlImages);
  }

  // get county
  getOfferDetails(userId): Observable<ApiResponseComponent[]> {
    return this.http.get<ApiResponseComponent[]>(this.url+ 'getOfferDetails.php?id='+userId);
  }


  changeStatusOffer(offerOwnerId, answer :string, acceptor, oId): Observable<ApiResponseComponent> {
    const statusData = {
      userId : offerOwnerId,
      ans : answer,
      accepted : acceptor,
      offerId : oId
    };
    return this.http.post<ApiResponseComponent>(this.url+ 'changeStatusOffer.php', statusData);
  }



  getNotifications(userId): Observable<ApiResponseComponent> {
    return this.http.get<ApiResponseComponent>(this.url+ 'getNotifications.php?id='+userId);
  }

  othersNotifications(acceptor): Observable<ApiResponseComponent> {
    return this.http.get<ApiResponseComponent>(this.url+ 'othersNotifications.php?acceptor='+acceptor);
  }


  getPendingOfferDetails(email):Observable<ApiResponseComponent> {
    return this.http.get<ApiResponseComponent>(this.url+ 'getPendingOfferDetails.php?email='+email);
  }

  getImages(userId): Observable<ApiResponseComponent> {
    return this.http.get<ApiResponseComponent>(this.url+ 'getImages.php?id='+userId);
  }

  deleteAcc(userId): Observable<ApiResponseComponent>{
    return this.http.post<ApiResponseComponent>(this.url + 'deleteAccount.php', userId);
  }

}
