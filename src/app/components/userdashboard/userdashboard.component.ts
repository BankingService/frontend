import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

   logoutconfirm(){
    swal({
      title: "Are you sure want to logout?",
      text: "",
      icon: "warning",
      buttons: ["sure","cancel"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (!willDelete) {
        
        this.router.navigate(['logout']);
      } else {
        
        
      }
    });
    
    // if(confirm("are you sure")){
    //   this.router.navigate(['logout']);
    // }
    
  }

}
