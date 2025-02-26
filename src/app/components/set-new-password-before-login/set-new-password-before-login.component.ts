import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { SetNewPassword } from 'src/app/dtoClass/set-new-password';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-set-new-password-before-login',
  templateUrl: './set-new-password-before-login.component.html',
  styleUrls: ['./set-new-password-before-login.component.css']
})
export class SetNewPasswordBeforeLoginComponent implements OnInit {

  form: FormGroup
  loginPassword: String
  transactionPassword: String

  customerId = localStorage.initialId
  
  error_messages = {
    'loginpassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length too small' },
      { type: 'maxlength', message: 'Exceeds password length limit' },
      { type: 'pattern', message: 'Password must consist one special character,one alphabet and one numeric' }
    ],
    'transactionpassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length too small' },
      { type: 'maxlength', message: 'Exceeds password length limit' },
      { type: 'pattern', message: 'Password must consist one special character,one alphabet and one numeric' }
    ],
    'confloginpassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length too small' },
      { type: 'compare', message: 'password not matched' },
      { type: 'maxlength', message: 'Exceeds password length limit' },
      { type: 'pattern', message: 'Password must consist one special character,one alphabet and one numeric' }
    ],
    'conftransactionpassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length too small' },
      { type: 'compare', message: 'password not matched' },
      { type: 'maxlength', message: 'Exceeds password length limit' },
      { type: 'pattern', message: 'Password must consist one special character,one alphabet and one numeric' }
    ],

  }

  constructor(private http: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    sessionStorage.clear();
    this.form = this.formBuilder.group({
      loginpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')
      ])),

      transactionpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')
      ])),
      confloginpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        RxwebValidators.compare({ fieldName: 'loginpassword' }),
        Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')
      ])),

      conftransactionpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        RxwebValidators.compare({ fieldName: 'transactionpassword' }),
        Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')
      ]))

    });
  }
  setnewpass:SetNewPassword
  setPasswords(form){
    this.setnewpass=new SetNewPassword( this.customerId,form.value.confloginpassword, form.value.conftransactionpassword) 
      
    this.http.setNewPasswords(this.setnewpass).subscribe(response=>{
      if(response.status=='SUCCESS'){
        swal("Password Set Successfully!!", "", "success");
        localStorage.clear();
        this.router.navigate(['login']);
      }
      else {
        swal("Error Occured", "Please try again after sometime", "error");
        alert(response.message)
      }
    })
  }

}
