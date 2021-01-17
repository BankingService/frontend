import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { json, RxwebValidators } from '@rxweb/reactive-form-validators';
import { Beneficiary } from 'src/app/modelClass/beneficiary';
import { TransactionstatementService } from 'src/app/services/transactionstatement.service';


@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.css']
})
export class AddBeneficiaryComponent implements OnInit {
  form: FormGroup;
  flag: boolean = false;
  beneficiary: Beneficiary
  otpmessage: any;
  error_messages = {

    'accountNo': [
      { type: 'required', message: 'Account number is required.' },
      { type: 'minlength', message: ' length too small' },
      { type: 'maxlength', message: 'Exceeds length limit' },
      { type: 'pattern', message: 'account number must consist of only numbers'}
    ],


    'reAccountNo': [
      { type: 'required', message: 'account number is required.' },
      { type: 'compare', message: 'account number not matched' },
      { type: 'minlength', message: ' length too small' },
      { type: 'maxlength', message: 'Exceeds length limit' },
      { type: 'pattern', message: 'account number must consist consist of only numbers' }

    ],
    'ifsc': [
      { type: 'required', message: 'ifsc is required.' },
      { type: 'minlength', message: 'ifsc length too small' },
      { type: 'maxlength', message: 'Exceeds  length limit' },
      { type: 'pattern', message: 'ifsc must consist of letters and numbers'}
    ],
    'name': [
      { type: 'required', message: 'name is required.' },
      { type: 'minlength', message: 'name length too small' },
      { type: 'maxlength', message: 'Exceeds length limit' },
      { type: 'pattern', message: 'name must consist of letters'}
    ],
    'nickName': [
      { type: 'required', message: 'nickname is required.' },
      { type: 'minlength', message: ' length too small' },
      { type: 'maxlength', message: 'Exceeds  length limit' },
      { type: 'pattern', message: 'nickname must consist of letters'}
    ]

  }

  constructor(private service: TransactionstatementService, private router: Router) { }

  ngOnInit() {
    this.form= new FormGroup({
      accountNo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern("[0-9]*")
      ])),
      reAccountNo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern("[0-9]*"),
        RxwebValidators.compare({ fieldName: 'accountNo' })
      ])),
      ifsc: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(12),
        Validators.pattern("[a-zA-Z][a-zA-Z]+[0-9]*")
      ])),
      name: new FormControl('',Validators.compose([
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern("^[a-zA-Z _]*$")
      ])),
      nickName: new FormControl('',Validators.compose( [
        Validators.required, 
        Validators.pattern("[a-zA-Z][a-zA-Z]+")
      ])),
      otp: new FormControl('',Validators.compose([
        Validators.required, 
        Validators.pattern("[0-9]*")
      ])),
    })

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  customerId = sessionStorage.customerId

  addBeneficiary(f) {
    if (f.value.otp == this.otpmessage) {

      this.beneficiary = new Beneficiary(this.customerId, f.value.accountNo, f.value.name,
        f.value.nickName, f.value.ifsc)

      console.log(f.value.accountNo)

      console.log(JSON.stringify(this.beneficiary));
      this.service.createBeneficiaryRequest(this.beneficiary).subscribe(response => {
        alert(JSON.stringify(response))
      })
    }
    else {
      alert("Invalid OTP")
      this.router.navigated = false;
      this.router.navigate(['addBeneficiary'])
    }

  }
  getOtp() {
    this.flag = true;
    this.service.getBeneficiaryOtp(this.customerId).subscribe(response => {
      this.otpmessage = response.message
      alert(this.otpmessage)
    })

  }


}