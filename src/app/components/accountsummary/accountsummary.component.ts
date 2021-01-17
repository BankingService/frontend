import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transactiondatetime } from 'src/app/dtoClass/transactiondatetime';
import { TransactionstatementService } from 'src/app/services/transactionstatement.service';

@Component({
  selector: 'app-accountsummary',
  templateUrl: './accountsummary.component.html',
  styleUrls: ['./accountsummary.component.css']
})
export class AccountsummaryComponent implements OnInit {

  customerInfo: any;
  transactiondatetime: Transactiondatetime;
  transactionstatement: any = [];
  flag: boolean = false;
  customerId = sessionStorage.customerId;
  customerName = sessionStorage.customerName;
  accountNumber = sessionStorage.accountNumber;
  ifsc = sessionStorage.ifsc;
  balance = sessionStorage.balance;
  constructor(private router: Router, private transaction: TransactionstatementService) { }

  ngOnInit() {

  
    // let fromdate = formdata.value.fromdate;
    let date1 = new Date().toISOString().slice(0, 10);
    let date = new Date();
    var hr = String(date.getHours()).padStart(2, '0');
    var min = String(date.getMinutes()).padStart(2, '0');
    var sec = String(date.getSeconds()).padStart(2, '0');
    var milsec = String(date.getMilliseconds()).padStart(3, '0');
    let todate = String(date1 + "T" + hr + ":" + min + ":" + sec + "." + milsec);
    //
    let fromdate = new Date();
    fromdate.setDate(fromdate.getDate() - 7);
    //  let fromdate1=fromdate.toISOString().slice(0,10);
    //  fromdate1 = fromdate + "T00:00:00.001";
    //  alert(fromdate1);
   // alert(fromdate.toISOString().slice(0, 10) + "T00:00:00.001")

    this.transactiondatetime = new Transactiondatetime(fromdate.toISOString().slice(0, 10) + "T00:00:00.001", todate, sessionStorage.getItem('accountNumber'));
    this.transaction.createTransactionStatementRequest(this.transactiondatetime).subscribe((data: {}) => {
   //   alert(JSON.stringify(data));
      this.transactionstatement.push(data);
      this.transactionstatement[0].sort(this.GetSortOrder("date"));
      if (this.transactionstatement[0].length == 0) {
    //    alert("no transactions are done within selected date")
      }
      else {
        this.flag = true;
      }
    })
  

    // this.transaction.createTransactionRequest(this.transactiondatetime).subscribe((data: {}) => {
    //   alert(JSON.stringify(data))
    //   this.transactionstatement.push(data);
    // })
    // location from ip address
    // https://www.melissa.com/v2/lookups/iplocation/ip/223.182.242.158?fmt=json&id=
    
  }
  GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return -1;
      } else if (a[prop] < b[prop]) {
        return 1;
      }
      return 0;
    }
    
  }
  

}
