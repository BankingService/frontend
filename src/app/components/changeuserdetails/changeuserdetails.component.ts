import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Customeraddress } from 'src/app/modelClass/customeraddress';
import { Customerinfo } from 'src/app/modelClass/customerinfo';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-changeuserdetails',
  templateUrl: './changeuserdetails.component.html',
  styleUrls: ['./changeuserdetails.component.css']
})
export class ChangeuserdetailsComponent implements OnInit {


  error_messages = {
    'mobileNumber': [
      { type: 'required', message: 'Mobile Number is required.' },
      { type: 'required', message: 'Mobile Number Should be of 10 digit' }
    ],
    'emailId': [
      { type: 'required', message: 'Email is required.' },
    ],
    'cAddressLine1': [
      { type: 'required', message: 'Address is required.' },
    ],
    'cAddressLine2': [
      { type: 'required', message: 'Address is required.' },
    ],
    'cState': [
      { type: 'required', message: 'State is required.' },
    ],
    'cCity': [
      { type: 'required', message: 'City is required.' },
    ],
    'cPincode': [
      { type: 'required', message: 'Pincode is required.' },
    ],

    'pAddressLine1': [
      { type: 'required', message: 'Address is required.' },
    ],
    'pAddressLine2': [
      { type: 'required', message: 'Address is required.' },
    ],
    'pState': [
      { type: 'required', message: 'State is required.' },
    ],
    'pCity': [
      { type: 'required', message: 'City is required.' },
    ],
    'pPincode': [
      { type: 'required', message: 'Pincode is required.' },
    ],
    'occupationType': [
      { type: 'required', message: 'Pincode is required.' },
    ],
    'sourceOfIncome': [
      { type: 'required', message: 'Pincode is required.' },
    ],

  }



form:FormGroup
  country:string="India"
  custdetails: any=[]
  constructor(public formBuilder: FormBuilder, private service: UserService, private route: ActivatedRoute, private router:Router) {   this.loadDetails() }

  customerId:number =sessionStorage.customerId

  ngOnInit() {
  

     this.form = this.formBuilder.group({


      title: new FormControl(''),
      firstName: new FormControl(''),
      middleName: new FormControl(''),
      lastName: new FormControl(''),
      fatherName: new FormControl(''),
  
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
        Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")
      ])),

      aadharCardNo: new FormControl(''),
     

      panNumber: new FormControl(''),
 
      dateOfBirth: new FormControl(''),
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
      cLandMark: new FormControl('', Validators.compose([
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
      pLandMark: new FormControl('', Validators.compose([
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
      occupationType: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ])),
      sourceOfIncome: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ])),
      grossAnnualIncome: new FormControl('', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(30),
        Validators.pattern('^[0-9]*$')
      ]))
    });
    
  }
  loadDetails(){
    this.service.viewProfileById(this.customerId)
    .subscribe((data: {}) => { 
      this.custdetails.push(data) 
    }
    )

  }

  customerRequest:Customerinfo;
  customerRequestAddress:Customeraddress;

  

  view(createCustomerFormObj){
  
   // this.customerRequest=createCustomerFormObj.getRawValue()

     console.log(this.custdetails)
     
    this.customerRequestAddress=new Customeraddress(createCustomerFormObj.value.cAddressLine1,createCustomerFormObj.value.pAddressLine1,
      createCustomerFormObj.value.cAddressLine2, createCustomerFormObj.value.pAddressLine2,createCustomerFormObj.value.cLandMark,
      createCustomerFormObj.value.pLandMark,createCustomerFormObj.value.cCity,createCustomerFormObj.value.pCity,createCustomerFormObj.value.cState,
      createCustomerFormObj.value.pState,createCustomerFormObj.value.cPincode,createCustomerFormObj.value.pPincode);

    this.customerRequest=new Customerinfo(this.customerId ,createCustomerFormObj.value.title,createCustomerFormObj.value.firstName,createCustomerFormObj.value.middleName,
      createCustomerFormObj.value.lastName,createCustomerFormObj.value.fatherName,createCustomerFormObj.value.mobileNumber,createCustomerFormObj.value.emailId,
      createCustomerFormObj.value.aadharCardNo,createCustomerFormObj.value.dateOfBirth,createCustomerFormObj.value.occupationType,createCustomerFormObj.value.sourceOfIncome,
      createCustomerFormObj.value.grossAnnualIncome,createCustomerFormObj.value.panNumber,this.customerRequestAddress);

    this.addcustomerrequest(this.customerRequest)

  }

  redirectTo()
  {
<<<<<<< HEAD
    this.router.navigate(['profilepass']);
=======
    this.router.navigate(['profilepass'])
>>>>>>> 4cde221e933edf1888af239ccd1b5dc54940c3ab
  }

  
  addcustomerrequest(customerrequest){
    console.log(customerrequest)
    this.service.editDetails(customerrequest).subscribe(response =>
      { 
        console.log(response)
         this.router.navigate(['useraccount']);
         })
  }

}

