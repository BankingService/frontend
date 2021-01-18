import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-transaction-successful',
  templateUrl: './transaction-successful.component.html',
  styleUrls: ['./transaction-successful.component.css']
})
export class TransactionSuccessfulComponent implements OnInit {
  details = JSON.parse(sessionStorage.getItem('data')) ;
  transactionTimer:any;
  constructor(private router:Router ,private locationStrategy:LocationStrategy) { 
  }

  ngOnInit() {
    this.preventBackButton();
    this.transactionTimer=setTimeout(() => {
      this.router.navigate(['home']);
    }, 5000);
    //alert(this.details.updatedBalance + "hii there")
    if(this.details.status=='SUCCESS'){
      swal("Yes!", "Transaction Successful!!", "success");
    sessionStorage.setItem('balance',this.details.updatedBalance)
    }
    else{
      swal("Transaction failed!!", "", "error");
    }
  }
  changedir(){
    this.router.navigate(["accountsummary"]);

  }
  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    })
  }
  ngOnDestroy(){
    clearTimeout(this.transactionTimer)

  }

  
}
