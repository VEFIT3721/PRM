import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './COMPONENT/user-registration/user-registration.component';
import { LoginComponent } from './COMPONENT/login/login.component';
import { MeetingComponent } from './COMPONENT/meeting/meeting.component';
import { HomeComponent } from './COMPONENT/home/home.component';
import { AuthGuard } from './GUARDS/auth.guard';
import { MeetingDetailsComponent } from './COMPONENT/meeting-details/meeting-details.component';
import { ExportComponent } from './COMPONENT/export/export.component';
import { DASHBOARDComponent } from './COMPONENT/dashboard/dashboard.component';
import { MISUPDATEComponent } from './COMPONENT/misupdate/misupdate.component';
<<<<<<< HEAD
import { ForgotComponent } from './COMPONENT/forgot/forgot.component';
import { ResetPasswordComponent } from './COMPONENT/reset-password/reset-password.component';
import { UsermasterComponent } from './COMPONENT/usermaster/usermaster.component';
=======

>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf



const routes: Routes = [{path:'register',component:UserRegistrationComponent},
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
   { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '', component: HomeComponent,
    children: [
<<<<<<< HEAD
      {path:'meeting',component:MeetingComponent,canActivate:[AuthGuard],data: { roles: ['ADMIN','USER','CHECKER'] }},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['', 'ADMIN','USER','CHECKER'] } },
  { path: 'update-meeting', component: MeetingDetailsComponent, canActivate: [AuthGuard], data: { roles: ['USER','ADMIN','CHECKER'] } },
  { path: 'reports', component: ExportComponent,canActivateChild:[AuthGuard],data:{roles:['ADMIN','USER']}},
      { path: 'register', component: UserRegistrationComponent },
      {path:'dashboard',component:DASHBOARDComponent},
      {path:'misupdate',component:MISUPDATEComponent},
      {path:'user',component:UsermasterComponent,canActivate:[AuthGuard],data:{roles:['ADMIN','CHECKER']}}
=======
      {path:'register',component:MeetingComponent,canActivate:[AuthGuard],data: { roles: ['Admin'] }},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['maker', 'Admin'] } },
  { path: 'update-meeting', component: MeetingDetailsComponent, canActivate: [AuthGuard], data: { roles: ['maker'] } },
  { path: 'export', component: ExportComponent },
  { path: 'user_registration', component: UserRegistrationComponent },
  { path: 'dashboard', component: DASHBOARDComponent },
  {path:'misupdate',component:MISUPDATEComponent}
>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf
    ]
    
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
