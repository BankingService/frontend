import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/dtoClass/transaction';
import { TransactionstatementService } from 'src/app/services/transactionstatement.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-rtgs',
  templateUrl: './rtgs.component.html',
  styleUrls: ['./rtgs.component.css']
})
export class RtgsComponent implements OnInit {
  form: FormGroup;
  transactionRequest:Transaction;
  flag:boolean = false;
  fromAccountNo:string[]=[sessionStorage.getItem('accountNumber')];
  toAccountNo:any = [];
  msg:string;
  otpMessage:string;
  error_messages = {
    'fromAccount': [
      { type: 'required', message: 'from account number is required.' }
     
    ],
    'toAccount': [
      { type: 'required', message: 'to account number is required or add beneficiary to continue' }
      ],
    'amount': [
      { type: 'required', message: 'amount is required.' },
      { type: 'minlength', message: 'minimum of 200000 should be sent' },
      { type: 'maxlength', message: 'amount cannot be transfered please reduce transfering amount' },
      { type: 'pattern', message: 'amount must number' }
    ],
    'transactionPwd': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length too small' },
      { type: 'maxlength', message: 'Exceeds password length limit' },
      { type: 'pattern', message: 'Password must consist one special character,one alphabet and one numeric' }
    ],
    'remark': [

      { type: 'maxlength', message: 'Exceeds length limit' },
      { type: 'pattern', message: 'Password must consist one special character,one alphabet and one numeric' }
    ],
    'otp': [
      { type: 'required', message: 'otp is required.' },
      { type: 'minlength', message: 'otp length invalid' },
      { type: 'maxlength', message: 'otp length invalid' },
      { type: 'pattern', message: 'otp must contain only number' }
    ]

  }

  constructor(private route:Router,private transaction:TransactionstatementService) { }

  ngOnInit() {
    this.route.routeReuseStrategy.shouldReuseRoute = () =>false;
    this.form = new FormGroup({
      fromAccount: new FormControl('', Validators.compose([
        Validators.required,
        
      ])),
      toAccount: new FormControl('', Validators.compose([
        Validators.required
      ])),
      amount: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(13),
        Validators.pattern("[0-9]*")
      ])),
      otp: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern("[0-9]*")
      ])),
      transactionPwd: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')
      ])),
      remark: new FormControl('', Validators.compose([
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z0-9 _]*$')
      ]))
    })
    this.transaction.createNoOfBeneficiariesRequest(sessionStorage.getItem('customerId')).subscribe((data:{})=>{
    //  alert(data);
      this.toAccountNo.push(data);
    })
  }
  setFlag(){
    this.getOtp();
    this.flag = true;
  }
  transactionrequest(form2){
    if(this.otpMessage==form2.value.otp){
   
    this.transactionRequest=new Transaction(form2.value.fromAccount,form2.value.toAccount,form2.value.amount,2,
      form2.value.transactionPwd ,form2.value.remark,sessionStorage.getItem('customerId'));

  
    this.transaction.createTransactionRequest(this.transactionRequest).subscribe((data:{}) =>
      {  
           this.msg=JSON.stringify(data);
           console.log(this.msg)
           sessionStorage.setItem('data',JSON.stringify(data));
         this.route.navigate(['transsuccess']);
         })
        }
        else{
          // alert("invalid otp");
          swal("Invalid OTP","", "warning");
          this.route.navigated=false;
          this.route.navigate(['rtgs']);
        }

      
  }
  
  getOtp(){
    this.transaction.getTransactionOtp(sessionStorage.getItem('customerId')).subscribe(response=>{
      
     this.otpMessage=response.message
    //  alert(this.otpMessage)
      })
  }
 
}
