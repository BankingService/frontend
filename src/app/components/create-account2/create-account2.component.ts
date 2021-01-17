import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CustomerserviceService } from 'src/app/services/customerservice.service';

@Component({
  selector: 'app-create-account2',
  templateUrl: './create-account2.component.html',
  styleUrls: ['./create-account2.component.css']
})
export class CreateAccount2Component implements OnInit {

  form: FormGroup;

  error_messages = {
    'aadharCard': [
      { type: 'required', message: 'please upload aadhar' },
      { type: 'pattern', message: 'please upload in these formats(jpg,png,pdf)' }
    ],
    'panCard': [
      { type: 'required', message: 'please upload pan' },
      { type: 'pattern', message: 'please upload in these formats(jpg,png,pdf)' }
    ],
    
  }
  

  constructor(public formBuilder: FormBuilder, private custservice: CustomerserviceService, private router: Router, private route:ActivatedRoute) { }



  ngOnInit() {
    sessionStorage.clear();
    this.form = this.formBuilder.group({
      aadharCard: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^.+\.(([pP][dD][fF])|([jJ][pP][gG])|([pP][nN][gG]))$')
      ])),
      panCard: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^.+\.(([pP][dD][fF])|([jJ][pP][gG])|([pP][nN][gG]))$')
      ])),
      
  }); 
  this.route.params.subscribe((params: Params) => {this.cid = params['cid']}); 
  }

  cid:any
  aadharCard:any
  panCard:any

  
 
  onFileChange(event) {
    this.aadharCard = event.target.files[0];
  }
  onFileChange2(event) {
    this.panCard= event.target.files[0];
  }

  message:string

  upload(form) {

    let formData: FormData = new FormData();
    formData.append('customerId', this.cid);
    formData.append('aadharCard', this.aadharCard);
    formData.append('panCard', this.panCard);
    alert(formData)
    console.log(formData)
    this.custservice.picUpload(formData).subscribe(response => 
      {  alert(JSON.stringify(response));
        let refId=response.message;
      this.router.navigate(['createstatus',{refId}]);
      })
      
      
     
  }



}
