import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  private timeout;
  constructor(private router:Router) { }

  ngOnInit() {
    // this.timeout = setTimeout(() => {

    //   // alert("hi there");
    //   this.router.navigate(['logout']);
    // }, 20000);
  }

   logoutconfirm(){
    swal({
      title: "Are you sure want to logout?",
      text: "",
      icon: "warning",
      buttons: ["Cancel","Sure"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        
        this.router.navigate(['logout']);
      } else {
         
      }
    });
    
    // if(confirm("are you sure")){
    //   this.router.navigate(['logout']);
    // }
    
  }
  ngOnDestroy(){
    // clearTimeout(this.timeout);
 }

}
