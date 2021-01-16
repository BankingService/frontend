import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SetNewPassword } from 'src/app/dtoClass/set-new-password';
import { UserService } from 'src/app/services/user.service';
import { SetNewPasswordBeforeLoginComponent } from '../set-new-password-before-login/set-new-password-before-login.component';

@Component({
  selector: 'app-setnewpassword',
  templateUrl: './setnewpassword.component.html',
  styleUrls: ['./setnewpassword.component.css']
})
export class SetnewpasswordComponent implements OnInit {

  form:FormGroup;
  loginPassword:String
  transactionPassword:String

  constructor(private http:UserService,private router:Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      loginpassword: new FormControl(),
      confloginpassword: new FormControl(),
      transactionpassword: new FormControl(),
      conftransactionpassword: new FormControl()
   });
  }

  customerId=sessionStorage.customerId
 setNewPass:SetNewPassword
  passwordChange(form){

    this.setNewPass = new SetNewPassword(this.customerId,form.value.confloginpassword,form.value.conftransactionpassword)

    this.http.setNewPasswords(this.setNewPass).subscribe(response=>{
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
