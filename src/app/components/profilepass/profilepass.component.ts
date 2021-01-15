import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
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
        Validators.minLength(1),
        Validators.maxLength(8)

      ])),

      confirmProfilePassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(8),
        RxwebValidators.compare({fieldName:'profilePassword'})

      ])) 
    });
  }

  profilecheck:Profilecheck;
  message:string

  profileLogin(adminformobj) {

    this.profilecheck = new Profilecheck(adminformobj.value.profilePassword)
    console.log(this.profilecheck)
    this.router.navigate(['useraccount'])
  //   this.service.verifyProfile(this.profilecheck,1).subscribe(response =>
  //  {  alert(JSON.stringify(response));
  //     if(response.status=='SUCCESS'){
  //       this.message=response.message;
  //     this.router.navigate(['admindashboard']);
  //     }
  //     else
  //     this.message = response.message;
  //   })
}

}
