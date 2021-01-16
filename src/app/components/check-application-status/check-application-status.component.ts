import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { CustomerserviceService } from 'src/app/services/customerservice.service';

@Component({
  selector: 'app-check-application-status',
  templateUrl: './check-application-status.component.html',
  styleUrls: ['./check-application-status.component.css']
})
export class CheckApplicationStatusComponent implements OnInit {

  form: FormGroup;
  showComponent: boolean = false

  error_messages = {
    'refId': [
      { type: 'required', message: 'Reference ID is required' },
      { type: 'minlength', message: 'minimum length not satisfied' },
      { type: 'maxlength', message: ' exceeds limit' },
      { type: 'pattern', message: 'referenceId is not in valid format(use only number)' }
    ]
  }
  constructor(public formBuilder: FormBuilder, private service: AdminServiceService) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.form = this.formBuilder.group({
      refId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(5),
        Validators.pattern('^[0-9]*$') 
      ]))
    },
    );
  }

  message: any

  changeBoolean() {
    this.showComponent = true;
  }

  view(id) {
    
    this.service.getAppStatus(id).subscribe(response => {
      this.message = response.message;
    })
  }
}
