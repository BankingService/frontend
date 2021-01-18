import { registerLocaleData } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { AccountstatementComponent } from './components/accountstatement/accountstatement.component';
import { AccountsummaryComponent } from './components/accountsummary/accountsummary.component';
import { ActiveCustomerDetailsComponent } from './Components/active-customer-details/active-customer-details.component';
import { AddBeneficiaryComponent } from './components/add-beneficiary/add-beneficiary.component';
import { AdminAcceptedCustomersComponent } from './Components/admin-accepted-customers/admin-accepted-customers.component';
import { AdminDashBoardComponent } from './components/admin-dash-board/admin-dash-board.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { BlockedCustomerDetailsComponent } from './Components/blocked-customer-details/blocked-customer-details.component';
import { BlockedCustomersComponent } from './Components/blocked-customers/blocked-customers.component';
import { ChangeuserdetailsComponent } from './components/changeuserdetails/changeuserdetails.component';
import { CheckApplicationStatusComponent } from './components/check-application-status/check-application-status.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { CreateAccount2Component } from './Components/create-account2/create-account2.component';
import { CreateaccountstatusComponent } from './Components/createaccountstatus/createaccountstatus.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { DashboardsidebarComponent } from './components/dashboardsidebar/dashboardsidebar.component';
import { FAQComponent } from './components/faq/faq.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ForgotuseridComponent } from './components/forgotuserid/forgotuserid.component';
import { FundTransferComponent } from './components/fund-transfer/fund-transfer.component';
import { HomeComponent } from './components/home/home.component';
import { ImpsComponent } from './components/imps/imps.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NeftComponent } from './components/neft/neft.component';
import { ProfilepassComponent } from './components/profilepass/profilepass.component';
import { RegisterComponent } from './components/register/register.component';
import { RtgsComponent } from './components/rtgs/rtgs.component';
import { SetNewPasswordBeforeLoginComponent } from './components/set-new-password-before-login/set-new-password-before-login.component';
import { SetnewpasswordComponent } from './components/setnewpassword/setnewpassword.component';
import { TransactionSuccessfulComponent } from './components/transaction-successful/transaction-successful.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { UserAuthGaurdService } from './services/user-auth-gaurd.service';

const routes: Routes = [
  // {path : '', component:HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'adminlogin', component: AdminloginComponent },
  { path: 'acceptedcust', component: AdminAcceptedCustomersComponent, canActivate: [AdminAuthGuardService] },
  { path: 'activecustdetails', component: ActiveCustomerDetailsComponent, canActivate: [AdminAuthGuardService] },
  { path: 'blockedcust', component: BlockedCustomersComponent, canActivate: [AdminAuthGuardService] },
  { path: 'blockedcustdetails', component: BlockedCustomerDetailsComponent, canActivate: [AdminAuthGuardService] },
  { path: 'admindashboard', component: AdminDashBoardComponent, canActivate: [AdminAuthGuardService] },
  { path: 'adminnavbar', component: AdminNavbarComponent, canActivate: [AdminAuthGuardService] },
  { path: 'accountstatement', component: AccountstatementComponent, canActivate: [UserAuthGaurdService] },
  { path: 'createstatus', component: CreateaccountstatusComponent },
  { path: 'checkapplication', component: CheckApplicationStatusComponent },
  { path: 'createaccount', component: CreateAccountComponent },
  { path: 'createaccount2', component: CreateAccount2Component },
  { path: 'customerdetailsadmin', component: CustomerDetailsComponent, canActivate: [AdminAuthGuardService] },
  { path: 'dashboardsidebar', component: DashboardsidebarComponent, canActivate: [UserAuthGaurdService] },
  { path: 'faq', component: FAQComponent, canActivate: [UserAuthGaurdService] },
  { path: 'profilepass', component: ProfilepassComponent, canActivate: [UserAuthGaurdService] },
  { path: 'forgotpass', component: ForgotPasswordComponent },
  { path: 'fundtransfer', component: FundTransferComponent, canActivate: [UserAuthGaurdService] },
  { path: 'logout', component: LogoutComponent, canActivate: [UserAuthGaurdService] },
  { path: 'register', component: RegisterComponent },
  { path: 'setnewpassword', component: SetnewpasswordComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'setnewpasswordbeforelogin', component: SetNewPasswordBeforeLoginComponent },
  { path: 'transsuccess', component: TransactionSuccessfulComponent, canActivate: [UserAuthGaurdService] },
  { path: 'useraccount', component: UserAccountComponent, canActivate: [UserAuthGaurdService] },
  { path: 'changedetails', component: ChangeuserdetailsComponent, canActivate: [UserAuthGaurdService] },
  { path: 'accountsummary', component: AccountsummaryComponent, canActivate: [UserAuthGaurdService] },
  { path: 'userdashboard', component: UserdashboardComponent, canActivate: [UserAuthGaurdService] },
  { path: 'neft', component: NeftComponent, canActivate: [UserAuthGaurdService] },
  { path: 'rtgs', component: RtgsComponent, canActivate: [UserAuthGaurdService] },
  { path: 'imps', component: ImpsComponent, canActivate: [UserAuthGaurdService] },
  { path: 'forgotuserid', component: ForgotuseridComponent },
  { path: 'addBeneficiary', component: AddBeneficiaryComponent, canActivate: [UserAuthGaurdService] },
  { path: '', component: HomeComponent }
  // { path:'', redirectTo:'rtgs',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
