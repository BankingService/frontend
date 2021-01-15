import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Register } from 'src/app/model_classes/register';
import { UserService } from 'src/app/services/user.service';
//import { RxwebValidators } from '@rxweb/reactive-form-validators';
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
    //  { type: 'required', message: 'Account Number must be of 8 digit' }
    ],

    // 'otp': [
    //   { type: 'required', message: 'OTP is required.' }
    // ],

    'loginPassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'required', message: 'password length must be of 6 char' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' },
      { type: 'pattern', message: 'password must consist one special character,one alphabet and one numeric' }
    ],
    'confirmLoginPassword': [
      { type: 'required', message: 'password not matched' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' },
      { type: 'pattern', message: 'password must consist one special character,one alphabet and one numeric' }
    ],
    'transactionPassword': [
      { type: 'required', message: 'password is required' },
      { type: 'required', message: 'password length must be of 4 char' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' },
      { type: 'pattern', message: 'password must consist one special character,one alphabet and one numeric' }
    ],
    'confirmTransactionPassword': [
      { type: 'required', message: 'password not matched' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' },
      { type: 'pattern', message: 'password must consist one special character,one alphabet and one numeric' }
    ],
    'profilePassword': [
      { type: 'required', message: 'password is required' },
      { type: 'required', message: 'password length must be of 4 char' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' },
      { type: 'pattern', message: 'password must consist one special character,one alphabet and one numeric' }
    ],
    'confirmProfilePassword': [
      { type: 'required', message: 'password required' },
      { type: 'compare', message: 'password not matched' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' },
      { type: 'pattern', message: 'password must consist one special character,one alphabet and one numeric' }
    ]
  }

  constructor(public formBuilder: FormBuilder, private service:UserService, private router:Router) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
      customerId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
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
        // Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        
      ])),

      confirmLoginPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        // Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        RegisterComponent.matchValues('loginPassword'),
      ])),

      transactionPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        // Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ])),
      confirmTransactionPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        // Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        RegisterComponent.matchValues('transactionPassword'),
      ])),

      profilePassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        // Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ])),
      confirmProfilePassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        // Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        RegisterComponent.matchValues('confirmProfilePassword'),
    //  RxwebValidators.compare({fieldName:'profilePassword'})
      ])),
})
    }
  


  public static matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };


  }


  register:Register
message:string
  Registration(form) {
    this.register = new Register(form.value.customerId, form.value.loginPassword,form.value.transactionPassword,form.value.profilePassword)
    console.log(this.register)
    this.service.registerUser(this.register).subscribe(response =>
      {  alert(JSON.stringify(response));
         console.log(response)
         if(response.status=='SUCCESS'){
           
           this.message=response.message;
           alert(this.message)
         this.router.navigate(['home']);
         }
         else
         this.message = response.message;
         alert(this.message)
       })
  }



  }

  

