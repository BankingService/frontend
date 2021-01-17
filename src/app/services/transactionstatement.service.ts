import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TransactionstatementService {
  apiUrl: string = 'http://localhost:8086/';
  //headers=new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private http: HttpClient) {
    // http://localhost:8086/customerInfo/
  }
  createTransactionStatementRequest(statement): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'accountStatement/',statement);
  }

  createTransactionRequest(transactionStatement): Observable<any> {
    console.log(JSON.stringify(transactionStatement))
    return this.http.post<any>(this.apiUrl + 'transact/', transactionStatement);
  }

  createBeneficiaryRequest(beneficiary): Observable<any> {
    //alert(beneficiary);
    return this.http.post<any>(this.apiUrl + 'addBeneficiary/',beneficiary);
  }

  createNoOfBeneficiariesRequest(customerId):Observable<any>{
    return this.http.get<any>(this.apiUrl+'viewBeneficiaries/'+customerId);
  }

  getBeneficiaryOtp(customerId):Observable<any>{
    return this.http.get<any>(this.apiUrl+'addBeneficiaryOtp/'+customerId);
  }

  getTransactionOtp(customerId):Observable<any>{
    return this.http.get<any>(this.apiUrl+'getTransactionOtp/'+customerId);
  }



}