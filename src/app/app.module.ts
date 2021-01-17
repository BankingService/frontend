import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import swal from 'sweetalert';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NeftComponent } from './components/neft/neft.component';
import { RtgsComponent } from './components/rtgs/rtgs.component';
import { ImpsComponent } from './components/imps/imps.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotuseridComponent } from './components/forgotuserid/forgotuserid.component';
import { CheckApplicationStatusComponent } from './components/check-application-status/check-application-status.component';
import { AddBeneficiaryComponent } from './components/add-beneficiary/add-beneficiary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionSuccessfulComponent } from './components/transaction-successful/transaction-successful.component';
import { AdminDashBoardComponent } from './components/admin-dash-board/admin-dash-board.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { FAQComponent } from './components/faq/faq.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { FundTransferComponent } from './components/fund-transfer/fund-transfer.component';
import { SetnewpasswordComponent } from './components/setnewpassword/setnewpassword.component';
import { AccountstatementComponent } from './components/accountstatement/accountstatement.component';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { DashboardsidebarComponent } from './components/dashboardsidebar/dashboardsidebar.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeComponent } from './components/home/home.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { AccountsummaryComponent } from './components/accountsummary/accountsummary.component';
import { HomeNavBarComponent } from './Components/home-nav-bar/home-nav-bar.component';
import { HomeFooterComponent } from './Components/home-footer/home-footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateaccountstatusComponent } from './Components/createaccountstatus/createaccountstatus.component';
import { CustomerserviceService } from './services/customerservice.service';
import { AdminServiceService } from './services/admin-service.service';
import { TransactionstatementService } from './services/transactionstatement.service';
import { ChangeuserdetailsComponent } from './components/changeuserdetails/changeuserdetails.component';
import { AdminAcceptedCustomersComponent } from './Components/admin-accepted-customers/admin-accepted-customers.component';
import { ActiveCustomerDetailsComponent } from './Components/active-customer-details/active-customer-details.component';
import { UserService } from './services/user.service';
import { CreateAccount2Component } from './Components/create-account2/create-account2.component';
import { ProfilepassComponent } from './components/profilepass/profilepass.component';
import { BlockedCustomersComponent } from './Components/blocked-customers/blocked-customers.component';
import { BlockedCustomerDetailsComponent } from './Components/blocked-customer-details/blocked-customer-details.component';
import { SetNewPasswordBeforeLoginComponent } from './components/set-new-password-before-login/set-new-password-before-login.component';
import { OtpserviceService } from './services/otpservice.service';
import { SplashscreenComponent } from './components/splashscreen/splashscreen.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';


//import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';



@NgModule({
  declarations: [
    AppComponent,
    NeftComponent,
    RtgsComponent,
    ImpsComponent,
    LoginComponent,
    ForgotuseridComponent,
    CheckApplicationStatusComponent,
    AddBeneficiaryComponent,
    TransactionSuccessfulComponent,
    AdminDashBoardComponent,
    CustomerDetailsComponent,
    AdminNavbarComponent,
    FAQComponent,
    CreateAccountComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    UserAccountComponent,
    FundTransferComponent,
    SetnewpasswordComponent,
    AccountstatementComponent,
    UserdashboardComponent,
    DashboardsidebarComponent,
    LogoutComponent,
    HomeComponent,
    AdminloginComponent,
    AccountsummaryComponent,
    HomeNavBarComponent,
    HomeFooterComponent,
    CreateaccountstatusComponent,
    ChangeuserdetailsComponent,
    AdminAcceptedCustomersComponent,
    ActiveCustomerDetailsComponent,
    CreateAccount2Component,
    ProfilepassComponent,
    BlockedCustomersComponent,
    BlockedCustomerDetailsComponent,
    SetNewPasswordBeforeLoginComponent,
    SplashscreenComponent,
    AboutUsComponent
    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
 //   RxReactiveFormsModule
  ],
  providers: [CustomerserviceService,AdminServiceService,TransactionstatementService,UserService,OtpserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
