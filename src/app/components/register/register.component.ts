import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Register } from 'src/app/modelClass/register';
import { UserService } from 'src/app/services/user.service';
import { OtpserviceService } from 'src/app/services/otpservice.service';
// import { RxwebValidators } from '@rxweb/reactive-form-validators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;


  error_messages = {
    'customerId': [
      { type: 'required', message: 'Customer Id is required.' },
      { type: 'minlength', message: 'Customer Id  must be 8 digits' },
      { type: 'maxlength', message: 'Customer Id  must be 8 digits' },
      { type: 'pattern', message: 'Customer Id must consist only numbers'}
    ],

    // 'otp': [
    //   { type: 'required', message: 'OTP is required.' }
    // ],

    'loginPassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length must be atleast 6' },
      { type: 'maxlength', message: 'password length must be less than 15' },
      { type: 'pattern', message: 'password must consist one special character,one alphabet and one numeric' }
    ],
    'confirmLoginPassword': [
      { type: 'required', message: 'password required' },
      { type: 'compare', message: 'password not matched' },
      { type: 'minlength', message: 'password length must be atleast 6' },
      { type: 'maxlength', message: 'password length must be less than 15' },
      { type: 'pattern', message: 'password must consist one special character,one alphabet and one numeric' }
    ],
    'transactionPassword': [
      { type: 'required', message: 'password is required' },
      { type: 'minlength', message: 'password length must be atleast 6' },
      { type: 'maxlength', message: 'password length must be less than 15' },
      { type: 'pattern', message: 'password must consist one special character,one alphabet and one numeric' }
    ],
    'confirmTransactionPassword': [
      { type: 'required', message: 'password required' },
      { type: 'compare', message: 'password not matched' },
      { type: 'minlength', message: 'password length must be atleast 6' },
      { type: 'maxlength', message: 'password length must be less than 15' },
      { type: 'pattern', message: 'password must consist one special character,one alphabet and one numeric' }
    ],
    'profilePassword': [
      { type: 'required', message: 'password is required' },
      { type: 'minlength', message: 'password length must be atleast 6' },
      { type: 'maxlength', message: 'password length must be less than 15' },
      { type: 'pattern', message: 'password must consist one special character,one alphabet and one numeric' }
    ],
    'confirmProfilePassword': [
      { type: 'required', message: 'password required' },
      { type: 'compare', message: 'password not matched' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' },
      { type: 'pattern', message: 'password must consist one special character,one alphabet and one numeric' }
    ],
    'otp': [
      { type: 'required', message: 'OTP is required' },
      { type: 'minlength', message: 'Enter 4 digit OTP' },
      { type: 'maxlength', message: 'Enter 4 digit OTP' },
    ]
  }

  constructor(public formBuilder: FormBuilder, private service: UserService, private router: Router, private otpservice: OtpserviceService) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
      customerId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('^[0-9]*$')
        // Validators.pattern(/^-?(0|[1-9]\d*)?$/)

      ])),
      // otp: new FormControl('', Validators.compose([
      //   Validators.required,
      //   Validators.minLength(4),
      //   Validators.maxLength(4),
      //   Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      // ])),
      loginPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}'),

      ])),

      confirmLoginPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}'),
        // RegisterComponent.matchValues('loginPassword'),
        RxwebValidators.compare({ fieldName: 'loginPassword' })
      ])),

      transactionPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}'),

      ])),
      confirmTransactionPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}'),

        // RegisterComponent.matchValues('transactionPassword'),
        RxwebValidators.compare({ fieldName: 'transactionPassword' })
      ])),

      profilePassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}'),
        
      ])),
      confirmProfilePassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}'),
        // RegisterComponent.matchValues('confirmProfilePassword'),
        RxwebValidators.compare({ fieldName: 'profilePassword' })
      ])),
      otp: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
      ])),
    })
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }



  // public static matchValues(
  //   matchTo: string // name of the control to match to
  // ): (AbstractControl) => ValidationErrors | null {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     return !!control.parent &&
  //       !!control.parent.value &&
  //       control.value === control.parent.controls[matchTo].value
  //       ? null
  //       : { isMatching: false };
  //   };


  // }


  register: Register
  message: string
  Registration(form) {
    this.register = new Register(form.value.customerId, form.value.loginPassword, form.value.transactionPassword, form.value.profilePassword)
    console.log(this.register)
    let otp = form.value.otp
    console.log(otp)
    if (otp == this.message) {
     // alert("verified");

      this.service.registerUser(this.register).subscribe(response => {
     //   alert(JSON.stringify(response));
        console.log(response)
        if (response.status == 'SUCCESS') {

          this.message = response.message;
          alert(this.message)
          this.router.navigate(['home']);
        }
        else{
          this.message = response.message;
        alert(this.message)
        }
      })
    }
    else {
      alert("Invalid OTP")
      this.router.navigated = false;
      this.router.navigate(['register']);
    }

  }

  flag: boolean = false;

  getOtp(id) {
    this.flag = true;
    console.log(id);
    // let temp=id;
    // sessionStorage.setItem('initialId',temp)
    this.otpservice.getOtpForRegistration(id).subscribe(response => {
      alert(response.message)
      this.message = response.message;
    })
  }


}



