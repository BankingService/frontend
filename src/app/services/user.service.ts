import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../modelClass/register';
import { UserLogin } from '../modelClass/user-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  verifyUserLogin(login): Observable<any>  {
    let url = "http://localhost:8086/userLogin";
   return this.http.post<any>(url, login); 
  }


  registerUser(register: Register): Observable<any>  {
    console.log(register);
    let url = "http://localhost:8086/register/";
   return this.http.post<any>(url, register); 
  }

  verifyProfile(profilepass): Observable<any>  {
   // console.log(login);
    let url = "http://localhost:8086/viewProfile";
   return this.http.post<any>(url,profilepass ); 
  }


  viewProfileById(id): Observable<any>  {
    let url = "http://localhost:8086/viewProfileDetails/"+id;
   return this.http.get<any>(url); 
  }

  editDetails(customerInfo): Observable<any>  {
    let url = "http://localhost:8086/editCustomerDetails/";
   return this.http.post<any>(url,customerInfo); 
  }
  
  setNewPasswords(setnewpassword):Observable<any>{
    let url = "http://localhost:8086/setnewpassword/"
    return this.http.post<any>(url,setnewpassword);
  }

  getUpdatedBalance(customerId):Observable<any>{
    let url= "http://localhost:8086/getAccountBalance/"+customerId;
    return this.http.get<any>(url);
  }
}
