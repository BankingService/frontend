import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    alert(this.details.updatedBalance + "hii there")
    if(this.details.status=='SUCCESS'){
    sessionStorage.setItem('balance',this.details.updatedBalance)
    }
  }
  changedir(){
    this.router.navigate(["accountsummary"]);

  }

  
}
