import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboardsidebar',
  templateUrl: './dashboardsidebar.component.html',
  styleUrls: ['./dashboardsidebar.component.css']
})
export class DashboardsidebarComponent implements OnInit {
  
  
  links:any=document.getElementsByClassName("link");
  
  customerInfo:any;
  dashSideTimer;
  customerId = sessionStorage.customerId;
  customerName = sessionStorage.customerName;
  accountNumber = sessionStorage.accountNumber;
  ifsc = sessionStorage.ifsc;
  balance = sessionStorage.balance;

  constructor(private userservice:UserService) {
   }

  ngOnInit() {
    this.dashSideTimer=setInterval(()=>{

    
    this.userservice.getUpdatedBalance(sessionStorage.customerId).subscribe(response =>
      {  //alert(JSON.stringify(response)+"hi there");
        //  alert(response.message);
         sessionStorage.setItem('balance',response.message);
         this.balance = sessionStorage.balance;
        }    
    )
  },5000)

  }

toggleactivelink(k){
  
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
       this.links[k].className += " active";
    
  }
  ngOnDestroy(){
    clearInterval(this.dashSideTimer);
  }
}


