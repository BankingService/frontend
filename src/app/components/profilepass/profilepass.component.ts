import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ProfilePassword } from 'src/app/dtoClass/profile-password';
import { Profilecheck } from 'src/app/dtoClass/profilecheck';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profilepass',
  templateUrl: './profilepass.component.html',
  styleUrls: ['./profilepass.component.css']
})
export class ProfilepassComponent implements OnInit {

  form: FormGroup;

  error_messages = {
    'profilePassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length too small' },
      { type: 'maxlength', message: 'Exceeds password length limit' },
      { type: 'pattern', message: 'Password must consist one special character,one alphabet and one numeric' }

    ],


    'confirmProfilePassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length too small' },
      { type: 'maxlength', message: 'Exceeds password length limit' },
      { type: 'compare', message: 'password not matched' },
      { type: 'pattern', message: 'Password must consist one special character,one alphabet and one numeric' }

    ],
  }

  constructor(public formBuilder: FormBuilder, private router: Router, private http: HttpClient, private service: UserService) { }

    ngOnInit() {
    this.form = this.formBuilder.group({

      profilePassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15)

      ])),

      confirmProfilePassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        RxwebValidators.compare({fieldName:'profilePassword'})

      ])) 
    });
  }

  profilecheck:ProfilePassword;
  message:string

  profileLogin(adminformobj) {

    this.profilecheck = new ProfilePassword(sessionStorage.customerId,adminformobj.value.profilePassword)
    console.log(this.profilecheck)
    this.router.navigate(['useraccount'])
    this.service.verifyProfile(this.profilecheck).subscribe(response =>
   {  //alert(JSON.stringify(response));
      if(response.status=='SUCCESS'){
        this.message=response.message;
      this.router.navigate(['useraccount']);
      }
      else
      this.message = response.message;
      alert("password incorrect")
    })
}

}
