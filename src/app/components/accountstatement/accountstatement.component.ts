import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Transactiondatetime } from 'src/app/dtoClass/transactiondatetime';
import { TransactionstatementService } from 'src/app/services/transactionstatement.service';

@Component({
  selector: 'app-accountstatement',
  templateUrl: './accountstatement.component.html',
  styleUrls: ['./accountstatement.component.css']
})
export class AccountstatementComponent implements OnInit {
  form: FormGroup;
  transactiondatetime: Transactiondatetime;
  transactionstatement: any = []

  flag: boolean = false;
  error_messages = {

    'fromdate': [
      { type: 'required', message: 'from date is required.' }
    ],

    'todate': [
      { type: 'required', message: 'to date is required.' }
    ],
  }

  constructor(private router: Router, private transaction: TransactionstatementService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({

      fromdate: new FormControl('', Validators.compose([
        Validators.required

      ])),

      todate: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })
  }

  onTransactionStatementRequest(formdata) {

    let fromdate = formdata.value.fromdate;
    let todate = formdata.value.todate;
    fromdate = fromdate + "T00:00:00.001";
    todate = todate + "T23:59:59.999";
    this.transactiondatetime = new Transactiondatetime(fromdate, todate, sessionStorage.getItem('accountNumber'));
    this.transaction.createTransactionStatementRequest(this.transactiondatetime).subscribe((data: {}) => {
      alert(JSON.stringify(data));
      this.transactionstatement.push(data);
      this.transactionstatement[0].sort(this.GetSortOrder("date"));
      if (this.transactionstatement[0].length == 0) {
        alert("no transactions are done within selected date")
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


