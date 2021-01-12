import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { AdminInfo } from 'src/app/model_classes/admin-info';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

 
  form: FormGroup;

  error_messages = {

    'adminId': [
      { type: 'required', message: 'Admin Id is required.' }
    ],

    'adminName': [
      { type: 'required', message: 'Admin Name is required.' }
    ],


    'adminPassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length too small' },
      { type: 'maxlength', message: 'Exceeds password length limit' },
      { type: 'pattern', message: 'Password must consist one special character,one alphabet and one numeric' }

    ],
  }

  constructor(public formBuilder: FormBuilder, private router: Router, private http: HttpClient, private service: AdminServiceService) { }

    ngOnInit() {
    this.form = this.formBuilder.group({

      adminId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(8)

      ])),

      adminName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(8)

      ])),

      adminPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')

      ])),

    },

    );
  }

  admin:AdminInfo
  message:string

   adminLogin(adminformobj) {

    this.admin = new AdminInfo(adminformobj.value.adminId,adminformobj.value.adminName,adminformobj.value.adminPassword)
    console.log(this.admin)
    this.service.verifyLogin(this.admin).subscribe(response =>
   {
      console.log(response)
      // if(response.status=='SUCCESS'){
      //   let adminId = response.adminId;
      //   let customerName = response.adminName;
      //   sessionStorage.setItem('adminId', String(adminId));
      //   sessionStorage.setItem('adminName', adminName);
      // this.router.navigate(['admindashboard']);
      // }
      // else
      // his.message = response.message;
    })
}
}
