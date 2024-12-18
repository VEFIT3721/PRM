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




const routes: Routes = [{path:'register',component:UserRegistrationComponent},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '', component: HomeComponent,
    children: [
      {path:'register',component:MeetingComponent,canActivate:[AuthGuard],data: { roles: ['Admin'] }},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['maker', 'Admin'] } },
  { path: 'update-meeting', component: MeetingDetailsComponent, canActivate: [AuthGuard], data: { roles: ['maker'] } },
  { path: 'export', component: ExportComponent },
  { path: 'user_registration', component: UserRegistrationComponent },
  { path: 'dashboard', component: DASHBOARDComponent },
  {path:'misupdate',component:MISUPDATEComponent}
    ]
    
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
