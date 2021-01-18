import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-active-customer-details',
  templateUrl: './active-customer-details.component.html',
  styleUrls: ['./active-customer-details.component.css']
})
export class ActiveCustomerDetailsComponent implements OnInit {
  custdetails: any = []
  constructor(private service: AdminServiceService, private route: ActivatedRoute, private router: Router) { }

  cid: string

  ngOnInit() {
    this.route.params.subscribe((params: Params) => { this.cid = params['cid'] });
    this.loadAccepted()
  }
  loadAccepted() {
    this.service.getAcceptedById(this.cid).subscribe((data: {}) => {
      this.custdetails.push(data)
    }
    )
  }

}
