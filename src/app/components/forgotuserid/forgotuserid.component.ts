import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OtpserviceService } from 'src/app/services/otpservice.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-forgotuserid',
  templateUrl: './forgotuserid.component.html',
  styleUrls: ['./forgotuserid.component.css']
})
export class ForgotuseridComponent implements OnInit {


  loginForm: FormGroup;
  form: FormGroup;
  otp: any;

  flag: boolean = false;
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
    public formBuilder: FormBuilder, private router: Router, private service: OtpserviceService
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
    });

    // { 
    //   validators: this.password.bind(this)
    // });

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  message: any;
  customerId: any;

  getotp(id) {
    this.flag = true;
    console.log(id);

    this.customerId = id;

    this.service.getOtpByAccountNumber(id).subscribe(response => {
      // alert(response.message)
      if(response.status=="FAILURE"){
      swal(response.message, "", "error");
      this.flag=false;
      }
      this.message = response.message;
    })
  }

  verifyotp(otp) {
    console.log(otp)
    if (otp == this.message) {
      this.service.verifyOtpByAccountNumber(this.customerId).subscribe(response => {
        // alert(response.message)
        this.message = response.message
        if (response.status == 'SUCCESS'){
          swal("Customer Id is verified Successfully!!", "plese check mail after sometime", "success");
        }else{
          swal("Please try again after sometime", "", "error");
        }
      })
      this.router.navigate(['login']);
    }
    else {
      // alert("Invalid OTP")
      swal("Invalid OTP", "", "warning");
      this.router.navigated = false;
      this.router.navigate(['forgotuserid']);
    }

  }


}
