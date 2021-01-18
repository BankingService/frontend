import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-accepted-customers',
  templateUrl: './admin-accepted-customers.component.html',
  styleUrls: ['./admin-accepted-customers.component.css']
})
export class AdminAcceptedCustomersComponent implements OnInit {

  adminName: string
  customers: any = []
  constructor(private service: AdminServiceService, private route: ActivatedRoute, private router: Router) { }

  viewdets(cid) {
    console.log(cid)
    this.router.navigate(['/activecustdetails', { cid }]);
  }

  ngOnInit() {
    this.adminName = sessionStorage.getItem('adminName');
    this.loadActive();
  }


  loadActive() {
    this.service.getAcceptedCutomers().subscribe((data: {}) => { this.customers = data })
  }

}
