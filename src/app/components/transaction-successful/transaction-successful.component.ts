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
  
  constructor(private router:Router ) { 
  }

  ngOnInit() {
    //alert(this.details.updatedBalance + "hii there")
    if(this.details.status=='SUCCESS'){
      swal("Yes!", "Transaction Successful!!", "success");
    sessionStorage.setItem('balance',this.details.updatedBalance)
    }
    else{
      swal("Some Error Occured", "Transaction failed!!", "error");
    }
  }
  changedir(){
    this.router.navigate(["accountsummary"]);

  }

  
}
