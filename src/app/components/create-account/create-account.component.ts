import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Session } from 'protractor';
import { CreateAccount } from 'src/app/modelClass/create-account';
import { Customeraddress } from 'src/app/modelClass/customeraddress';
import { Customerdocs } from 'src/app/modelClass/customerdocs';
import { Customerinfo } from 'src/app/modelClass/customerinfo';
import { ImageDocs } from 'src/app/modelClass/image-docs';
import { CustomerserviceService } from 'src/app/services/customerservice.service';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  form: FormGroup;

  refId: string;
  msg: string;
  country: string = "India"



  error_messages = {
    'title': [
      { type: 'required', message: 'title is required.' }
    ],

    'otp': [
      { type: 'required', message: 'OTP is required.' },
      { type: 'minlength', message: 'OTP length.' },
      { type: 'maxlength', message: 'OTP length.' }
    ],
    'firstName': [
      { type: 'required', message: 'First Name is required.' },
      { type: 'minlength', message: 'minimum length of 2 to 30 characters' },
      { type: 'maxlength', message: 'characters allowed till 30 characters' },
      { type: 'pattern', message: 'firstname is not in valid format(use only letters and spaces)' }
    ],
    'middleName':[
      { type: 'minlength', message: 'minimum length of 2 to 30 characters' },
      { type: 'maxlength', message: 'characters allowed till 30 characters' }
    ],
    'lastName': [
      { type: 'required', message: 'Last Name is required.' },
      { type: 'minlength', message: 'minimum length of 2 to 30 characters' },
      { type: 'maxlength', message: 'characters allowed till 30 characters' },
      { type: 'pattern', message: 'lastname is not in valid format(use only letters and spaces)' }
    ],
    'fatherName': [
      { type: 'required', message: 'Father Name is required.' },
      { type: 'minlength', message: 'minimum length of 2 to 30 characters' },
      { type: 'maxlength', message: 'characters allowed till 30 characters' },
      { type: 'pattern', message: 'fathername is not in valid format(use only letters and spaces)' }
    ],
    'mobileNumber': [
      { type: 'required', message: 'Mobile Number is required.' },
      { type: 'minLength', message: 'enter valid mobile number' },
      { type: 'maxLength', message: 'enter valid mobile number' },
      { type: 'pattern', message: 'mobilenumber is not in valid format(use only number)' }
    ],
    'emailId': [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'minimum length of 5 to 30 characters' },
      { type: 'maxlength', message: 'characters allowed till 30 characters' },
      { type: 'pattern', message: 'Email is not in valid format' }

    ],
    'aadharCardNo': [
      { type: 'required', message: 'Aadhar Number is required.' },
      { type: 'maxLength', message: 'Aadhar Number Should be of 12 digit' },
      { type: 'minLength', message: 'Aadhar Number Should be of 12 digit' },
      { type: 'pattern', message: 'aadhar is not in valid format(use only number)' }
    ],

    'panNumber': [
      { type: 'required', message: 'pan is required.' },
      { type: 'pattern', message: 'enter valid pannumber(letters should be capital)' }
    ],

    'dateOfBirth': [
      { type: 'required', message: 'dob is required' }
    ],

    'cAddressLine1': [
      { type: 'required', message: 'Address is required.' },
      { type: 'minlength', message: 'minimum length of 3 to 30 characters' },
      { type: 'maxlength', message: 'characters allowed till 30 characters' }
    ],
    'cAddressLine2': [
      { type: 'required', message: 'Address is required.' },
      { type: 'minlength', message: 'minimum length of 3 to 30 characters' },
      { type: 'maxlength', message: 'characters allowed till 30 characters' }
    ],
    'cLandMark':[
      { type: 'minlength', message: 'minimum length of 3 to 30 characters' },
      { type: 'maxlength', message: 'characters allowed till 30 characters' }
    ],
    'cState': [
      { type: 'required', message: 'State is required.' },
      { type: 'minlength', message: 'minimum length of 3 to 30 characters' },
      { type: 'maxlength', message: 'characters allowed till 30 characters' }
    ],
    'cCity': [
      { type: 'required', message: 'City is required.' },
      { type: 'minlength', message: 'minimum length of 3 to 30 characters' },
      { type: 'maxlength', message: 'characters allowed till 30 characters' }
    ],
    'cPincode': [
      { type: 'required', message: 'Pincode is required.' },
      { type: 'minLength', message: 'enter valid pincode' },
      { type: 'maxLength', message: 'enter valid pincode' },
      { type: 'pattern', message: 'pincode is not in valid format(use only number)' }
    ],

    'pAddressLine1': [
      { type: 'required', message: 'Address is required.' },
      { type: 'minlength', message: 'minimum length of 3 to 30 characters' },
      { type: 'maxlength', message: 'characters allowed till 30 characters' }
    ],
    'pAddressLine2': [
      { type: 'required', message: 'Address is required.' },
      { type: 'minlength', message: 'minimum length of 3 to 30 characters' },
      { type: 'maxlength', message: 'characters allowed till 30 characters' }
    ],
    'pState': [
      { type: 'required', message: 'State is required.' },
      { type: 'minlength', message: 'minimum length of 3 to 30 characters' },
      { type: 'maxlength', message: 'characters allowed till 30 characters' }
    ],
    'pLandMark':[
      { type: 'minlength', message: 'minimum length of 3 to 30 characters' },
      { type: 'maxlength', message: 'characters allowed till 30 characters' }
    ],
    'pCity': [
      { type: 'required', message: 'City is required.' },
      { type: 'minlength', message: 'minimum length of 3 to 30 characters' },
      { type: 'maxlength', message: 'characters allowed till 30 characters' }
    ],
    'pPincode': [
      { type: 'required', message: 'Pincode is required.' },
      { type: 'minLength', message: 'enter valid pincode' },
      { type: 'maxLength', message: 'enter valid pincode' },
      { type: 'pattern', message: 'pincode is not in valid format(use only number)' }
    ],
    'occupationType':[
      { type: 'required', message: 'Pincode is required.' },
      { type: 'minlength', message: 'minimum length of 3 to 30 characters' },
      { type: 'maxlength', message: 'characters allowed till 30 characters' }
    ],
    'sourceOfIncome':[
      { type: 'required', message: 'Pincode is required.' },
      { type: 'minlength', message: 'minimum length of 3 to 30 characters' },
      { type: 'maxlength', message: 'characters allowed till 30 characters' }
    ],
    'grossAnnualIncome':[
      { type: 'minlength', message: 'minimum length of 4 to 30 characters' },
      { type: 'maxlength', message: 'characters allowed till 30 characters' },
      { type: 'pattern', message: 'Income is not in valid format(use only number)' }
    ]


  }

  constructor(public formBuilder: FormBuilder, private custservice: CustomerserviceService, private router: Router) { }

  ngOnInit() {
    sessionStorage.clear();
    this.form = this.formBuilder.group({

      title: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z\\s]*$')
      ])),

      middleName: new FormControl('',Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(30)
      ])),

      lastName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z\\s]*$')
      ])),

      fatherName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z\\s]*$')
      ])),

      mobileNumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$')

      ])),
      emailId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ])),

      aadharCardNo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12),
        Validators.pattern('^[0-9]*$')
      ])),

      panNumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')

      ])),

      dateOfBirth: new FormControl('', Validators.compose([
        Validators.required
      ])),
      cAddressLine1: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ])),

      cAddressLine2: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ])),
      cLandMark: new FormControl('',Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(30)
      ])),

      cCity: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ])),
      cState: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ])),
      cPincode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern('^[0-9]*$')
      ])),

      pAddressLine1: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ])),

      pAddressLine2: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ])),
      pLandMark: new FormControl('',Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(30)
      ])),

      pCity: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ])),
      pState: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ])),
      pPincode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern('^[0-9]*$')
      ])),
      occupationType: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ])),
      sourceOfIncome: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ])),
      grossAnnualIncome: new FormControl('',Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(30),
        Validators.pattern('^[0-9]*$')
      ]))
    });

  }




  customerRequest: Customerinfo;
  customerRequestAddress: Customeraddress;

  mailId: string
  view(createCustomerFormObj) {

    this.customerRequestAddress = new Customeraddress(createCustomerFormObj.value.cAddressLine1, createCustomerFormObj.value.pAddressLine1,
      createCustomerFormObj.value.cAddressLine2, createCustomerFormObj.value.pAddressLine2, createCustomerFormObj.value.cLandMark,
      createCustomerFormObj.value.pLandMark, createCustomerFormObj.value.cCity, createCustomerFormObj.value.pCity, createCustomerFormObj.value.cState,
      createCustomerFormObj.value.pState, createCustomerFormObj.value.cPincode, createCustomerFormObj.value.pPincode);

    this.customerRequest = new Customerinfo(createCustomerFormObj.value.title, createCustomerFormObj.value.firstName, createCustomerFormObj.value.middleName,
      createCustomerFormObj.value.lastName, createCustomerFormObj.value.fatherName, createCustomerFormObj.value.mobileNumber, createCustomerFormObj.value.emailId,
      createCustomerFormObj.value.aadharCardNo, createCustomerFormObj.value.dateOfBirth, createCustomerFormObj.value.occupationType, createCustomerFormObj.value.sourceOfIncome,
      createCustomerFormObj.value.grossAnnualIncome, createCustomerFormObj.value.panNumber, this.customerRequestAddress);

    this.mailId = String(createCustomerFormObj.value.emailId)

    
    this.addcustomerrequest(this.customerRequest)

  }
  addcustomerrequest(customerrequest) {
    console.log(JSON.stringify(customerrequest))
    this.custservice.createCustomerRequest(customerrequest).subscribe(response => {
      alert(JSON.stringify(response));
      let cid = response.id;
      let msg = response.msg;
      alert(msg)
      let mail = this.mailId
      console.log(mail)
      this.router.navigate(['createaccount2', { cid, mail }]);
    })
  }

}