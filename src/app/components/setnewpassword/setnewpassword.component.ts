import {  Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SetNewPassword } from 'src/app/dtoClass/set-new-password';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-setnewpassword',
  templateUrl: './setnewpassword.component.html',
  styleUrls: ['./setnewpassword.component.css']
})
export class SetnewpasswordComponent implements OnInit {

  form: FormGroup;
  loginPassword: String
  transactionPassword: String

  error_messages = {
    'loginpassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'compare', message: 'password not matched' },
      { type: 'minlength', message: 'Password length too small' },
      { type: 'maxlength', message: 'Exceeds password length limit' },
      { type: 'pattern', message: 'Password must consist one special character,one alphabet and one numeric' }
    ],
    'confloginpassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'compare', message: 'password not matched' },
      { type: 'minlength', message: 'Password length too small' },
      { type: 'maxlength', message: 'Exceeds password length limit' },
      { type: 'pattern', message: 'Password must consist one special character,one alphabet and one numeric' }
    ],
    'transactionpassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'compare', message: 'password not matched' },
      { type: 'minlength', message: 'Password length too small' },
      { type: 'maxlength', message: 'Exceeds password length limit' },
      { type: 'pattern', message: 'Password must consist one special character,one alphabet and one numeric' }
    ],
    'conftransactionpassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'compare', message: 'password not matched' },
      { type: 'minlength', message: 'Password length too small' },
      { type: 'maxlength', message: 'Exceeds password length limit' },
      { type: 'pattern', message: 'Password must consist one special character,one alphabet and one numeric' }
    ],

  }

  constructor(private http: UserService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
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
        Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}'),
        RxwebValidators.compare({ fieldName: 'loginpassword' })
      ])),

      conftransactionpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}'),
        RxwebValidators.compare({ fieldName: 'transactionpassword' })
      ]))

    });
  }

  customerId = sessionStorage.customerId
  setNewPass: SetNewPassword
  passwordChange(form) {
    alert(this.customerId+form.value.confloginpassword+ form.value.conftransactionpassword)
    this.setNewPass = new SetNewPassword(this.customerId, form.value.confloginpassword, form.value.conftransactionpassword)

    this.http.setNewPasswords(this.setNewPass).subscribe(response => {
      if (response.status == 'SUCCESS') {
        swal("Password Set Successfully!!", "", "success");
        this.router.navigate(['accountsummary']);
      }
      else {
        swal("Error Occured", "Please try again after sometime", "error");
        alert(response.message)
      }
    })
  }
}
