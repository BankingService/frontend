import { verifyHostBindings } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/model_classes/user-login';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

form: FormGroup;
customerId:string="hii there";
error_messages = {
  'customerId': [
    {  type: 'required', message: 'User Id is required.' }
  ],


  'loginPassword': [
    { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length too small' },
      { type: 'maxlength', message: 'Exceeds password length limit' },
      { type: 'pattern', message:'Password must consist one special character,one alphabet and one numeric'}
   
  ],
  
}  

constructor(public formBuilder: FormBuilder,private router:Router, private service:UserService) { }

ngOnInit() {
  this.form = this.formBuilder.group({
    customerId: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8)
      
    ])),
    
   loginPassword: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
      Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')
      
    ])),
    
  }, 
    
  );
}
login:UserLogin
message:string


login2:Login2
login3:Login3


userlogin(form){
  this.login = new UserLogin(form.value.customerId, form.value.loginPassword)
  this.login2=new Login2(this.login)
  this.login3=new Login3(this.login2)
  this.verify()
}

  verify(){
  console.log(this.login3)
  this.service.verifyUserLogin(this.login3).subscribe(response =>
    {  alert(JSON.stringify(response));
       console.log(response)
       if(response.status=='SUCCESS'){
         let customerId = response.customerId;
         let accountNumber = response.accountNumber;
         this.message=response.message;
         sessionStorage.setItem('customerId', String(customerId));
         sessionStorage.setItem('accountNumber', String(accountNumber));
       this.router.navigate(['accountsummary']);
       }
       else
       this.message = response.message;
       alert(this.message)
     })
}
}

export class Login2{
  private login2:UserLogin
  constructor(login2){
    this.login2=login2
  }
}

export class Login3{
  private login3:Login2
  constructor(login3){
    this.login3=login3
  }
}

