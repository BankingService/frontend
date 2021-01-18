import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  logoutconfirm() {
    swal({
      title: "Are you sure want to logout?",
      text: "",
      icon: "warning",
      buttons: ["sure","cancel"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (!willDelete) {
        sessionStorage.clear();
        this.router.navigate(['adminlogin']);
      } else {
            
      }
    });
    // if (confirm("are you sure")) {
    //   sessionStorage.clear();
    //   this.router.navigate(['adminlogin']);
    // }
  }
}
