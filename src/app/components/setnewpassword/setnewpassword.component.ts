import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-setnewpassword',
  templateUrl: './setnewpassword.component.html',
  styleUrls: ['./setnewpassword.component.css']
})
export class SetnewpasswordComponent implements OnInit {

  form:FormGroup;
  loginPassword:String
  transactionPassword:String

  error_messages = {
    'loginpassword': [
      { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password length too small' },
        { type: 'maxlength', message: 'Exceeds password length limit' },
        { type: 'pattern', message:'Password must consist one special character,one alphabet and one numeric'}
    ],
    'confloginpassword': [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password length too small' },
        { type: 'maxlength', message: 'Exceeds password length limit' },
        { type: 'pattern', message:'Password must consist one special character,one alphabet and one numeric'}
    ],
    'transactionpassword': [
      { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password length too small' },
        { type: 'maxlength', message: 'Exceeds password length limit' },
        { type: 'pattern', message:'Password must consist one special character,one alphabet and one numeric'}
    ],
    'conftransactionpassword': [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password length too small' },
        { type: 'maxlength', message: 'Exceeds password length limit' },
        { type: 'pattern', message:'Password must consist one special character,one alphabet and one numeric'}
    ],
    
  }  

  constructor(private http:UserService,private router:Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      loginpassword: new FormControl(
        '', Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')  
        ])
      ),
      confloginpassword: new FormControl(
        '', Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')          
        ])
      ),
      transactionpassword: new FormControl(
        '', Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')         
        ])
      ),
      conftransactionpassword: new FormControl(
        '', Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')          
        ])
      )
   });
  }

  customerId=sessionStorage.customerId

  passwordChange(form){
    this.loginPassword = form.value.confloginpassword
    this.transactionPassword = form.value.conftransactionpassword
    this.http.setNewPasswords(this.customerId,this.loginPassword,this.transactionPassword).subscribe(response=>{
      if(response.status=='SUCCESS'){
        alert(response.message)
        this.router.navigate(['accountsummary']);
      }
      else{
        alert(response.message)
      }
    })
  }
}
