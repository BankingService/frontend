import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Customerinfo } from 'src/app/modelClass/customerinfo';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  custdetails: any = []
  message: any;
  constructor(private service: AdminServiceService, private route: ActivatedRoute, private router: Router) { }


  adminName: string
  refid: string
  ngOnInit() {
    this.route.params.subscribe((params: Params) => { this.refid = params['refid'] });
    console.log(this.refid)
    this.loadPending()
  }

  loadPending() {
    console.log(this.refid)
    this.service.getPendingById(this.refid)
      .subscribe((data: {}) => {
        this.custdetails.push(data)
      }
      )
    console.log(this.custdetails)

  }

  redirectTo() {
    this.router.navigate(['/admindashboard'])
  }

  adminId = sessionStorage.adminId;

  sendAdminRemarks(remark) {
    this.service.performAction(this.adminId, this.refid, remark).subscribe(response => { //alert(JSON.stringify(response));
      this.message = response.message
      if (response.status == ('SUCCESS')) {
        alert(this.message)
        this.router.navigate(['/admindashboard'])

      }
      else {
        alert(this.message)
      }


    })

  }




}