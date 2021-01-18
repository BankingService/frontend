import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-blocked-customer-details',
  templateUrl: './blocked-customer-details.component.html',
  styleUrls: ['./blocked-customer-details.component.css']
})
export class BlockedCustomerDetailsComponent implements OnInit {
  custdetails: any = []
  message: any;
  constructor(private service: AdminServiceService, private route: ActivatedRoute, private router: Router) { }

  cid: string

  ngOnInit() {
    this.route.params.subscribe((params: Params) => { this.cid = params['cid'] });
    this.loadBlocked()
  }
  loadBlocked() {
    this.service.getBlockedById(this.cid)
      .subscribe((data: {}) => {
        this.custdetails.push(data)
      }
      )
  }

  redirectTo() {
    this.router.navigate(['/admindashboard'])
  }

  adminId = sessionStorage.adminId;

  sendAdminRemarks(remark) {
    this.service.unblockAction(this.adminId, this.cid, remark).subscribe(response => { //alert(JSON.stringify(response));
      this.message = response.message
      if (response.status == 'SUCCESS') {
        this.router.navigate(['/admindashboard'])
        // alert(this.message)
        swal(this.message,"", "info");
      }
      else {
        // alert(this.message)
        swal("Some Error Occured","", "error");
      }
    })

  }


}
