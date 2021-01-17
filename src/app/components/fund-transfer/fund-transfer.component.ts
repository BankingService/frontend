import { Component, OnInit } from '@angular/core';
import { TransactionstatementService } from 'src/app/services/transactionstatement.service';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css']
})
export class FundTransferComponent implements OnInit {
  flag: boolean = false;
  constructor(private noOfBeneficiaries: TransactionstatementService) {
    this.noOfBeneficiaries.createNoOfBeneficiariesRequest(sessionStorage.getItem('customerId')).subscribe((data: []) => {

      if (data.length == 0) {
        this.flag = true;
      }

    })
  }

  ngOnInit() {
  }


}
