import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-blocked-customers',
  templateUrl: './blocked-customers.component.html',
  styleUrls: ['./blocked-customers.component.css']
})
export class BlockedCustomersComponent implements OnInit {

  adminName: string
  customers: any = []
  constructor(private service: AdminServiceService, private route: ActivatedRoute, private router: Router) { }

  viewdets(cid) {
    console.log(cid)
    this.router.navigate(['/blockedcustdetails', { cid }]);
  }

  ngOnInit() {
    this.adminName = sessionStorage.getItem('adminName');
    this.loadBlocked();
  }


  loadBlocked() {
    this.service.getBlockedCuts().subscribe((data: {}) => { this.customers = data })
  }

}