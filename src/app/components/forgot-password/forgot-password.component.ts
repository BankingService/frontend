import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OtpserviceService } from 'src/app/services/otpservice.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  
  loginForm: FormGroup;
  form: FormGroup;
  otp : any;
  
  flag:boolean=false;
  error_messages = {
    'id': [
      { type: 'required', message: 'id is required.' },
      { type: 'minlength', message: 'length too small' },
      { type: 'maxlength', message: 'length exceeds' },
      { type: 'pattern', message: 'id consists of only numbers' }
    ],
    'OTP': [
      { type: 'required', message: 'OTP is required.' },
      { type: 'minlength', message: 'OTP invalid length' },
      { type: 'maxlength', message: 'OTP invalid length' },
      { type: 'pattern', message: 'otp consists of only numbers' }
    ],
    
  }

  constructor(
    public formBuilder: FormBuilder,private router:Router, private service: OtpserviceService
  //  private http: HttpClient,private router: Router,
   // private service:ConnectionService
  ) {
    
      
  }

  ngOnInit() {
    sessionStorage.clear();
    this.loginForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(8),
        Validators.minLength(8),
        Validators.pattern('[0-9]*')

      ])),
    },
    )

    this.form = this.formBuilder.group({
         
      OTP: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern('[0-9]*')
        
      ])),
    },);
    
    // { 
    //   validators: this.password.bind(this)
    // });
    this.router.routeReuseStrategy.shouldReuseRoute = () =>false;
  }

  message: any;
  
  getotp(id){
    this.flag=true;
    console.log(id);
    let temp=id;
    localStorage.setItem('initialId',temp)
    this.service.getOtp(id).subscribe(response => {
      alert(response.message)
      this.message = response.message;})
  }

  verifyotp(otp){
    console.log(otp)
    if(otp==this.message){
        alert("verified");
        this.router.navigate(['setnewpasswordbeforelogin']);
      }
      else
      {
        alert("Invalid OTP")
        this.router.navigated=false;
        this.router.navigate(['forgotpass']);
      }
    
  }

  
}
