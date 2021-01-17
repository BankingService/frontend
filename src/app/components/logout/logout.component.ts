import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from 'src/app/services/logout.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  logoutTimer;
  lastlog:any=[]
  flag:boolean = false;
  constructor(public router:Router,private locationStrategy: LocationStrategy,public service:LogoutService) { 
    
  }

  ngOnInit() {
    
   
this.preventBackButton();
this.lastlogin();
// clearTimeout(dashTimer);
    this.logoutTimer=setTimeout(() => {
      this.router.navigate(['home']);
    }, 5000);
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    })
  }
  lastlogin(){
  this.service.lastLogin(sessionStorage.getItem('customerId')).subscribe((data: {}) => { 
   this.lastlog.push(data)
   this.flag=true;
   sessionStorage.clear();
    // this.locationfind();
  })
  // location from ip address
  // https://www.melissa.com/v2/lookups/iplocation/ip/223.182.242.158?fmt=json&id=
  }
  locationfind(){
    this.service.lastLocation(this.lastlog.lastLoginIpAddress).subscribe((data: {}) => { 
      alert(data)
    })

  }
 ngOnDestroy(){
    clearTimeout(this.logoutTimer)
 }
  
}
