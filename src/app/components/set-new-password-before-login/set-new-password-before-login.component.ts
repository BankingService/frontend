import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SetNewPassword } from 'src/app/dtoClass/set-new-password';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-set-new-password-before-login',
  templateUrl: './set-new-password-before-login.component.html',
  styleUrls: ['./set-new-password-before-login.component.css']
})
export class SetNewPasswordBeforeLoginComponent implements OnInit {

form:FormGroup
loginPassword:String
transactionPassword:String

customerId=localStorage.initialId

  constructor(private http:UserService,private router:Router,private formBuilder:FormBuilder) { }

  ngOnInit() {
    sessionStorage.clear();
    this.form = this.formBuilder.group({
      loginpassword: new FormControl(),
      
     transactionpassword: new FormControl(),
     confloginpassword: new FormControl(),
      
     conftransactionpassword: new FormControl(),
      
    }, 
      
    );
  }
  setnewpass:SetNewPassword
  setPasswords(form){
    this.setnewpass=new SetNewPassword( this.customerId,form.value.confloginpassword, form.value.conftransactionpassword) 
      
    this.http.setNewPasswords(this.setnewpass).subscribe(response=>{
      if(response.status=='SUCCESS'){
        alert(response.message)
        localStorage.clear();
        this.router.navigate(['login']);
      }
      else{
        alert(response.message)
      }
    })
  }

}
