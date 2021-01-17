import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  country:string="India"
  custdetails: any=[]
  constructor(private router:Router, private service:UserService) { }
 
  customerId: number =sessionStorage.customerId

  ngOnInit() {
      this.service.viewProfileById(this.customerId)
      .subscribe((data: {}) => {
        this.custdetails.push(data) 
      }
      )

      console.log(this.custdetails)
    }

  redirectTo()
  {
    this.router.navigate(['/accountsummary'])
  }
  redirectTo2()
  {
    this.router.navigate(['/changedetails'])
  }


}
