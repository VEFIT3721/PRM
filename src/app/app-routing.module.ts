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



const routes: Routes = [{path:'register',component:UserRegistrationComponent},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '', component: HomeComponent,
    children: [
      {path:'meeting',component:MeetingComponent,canActivate:[AuthGuard],data: { roles: ['ADMIN','USER','CHECKER'] }},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['', 'ADMIN','USER','CHECKER'] } },
  { path: 'edit', component: MeetingDetailsComponent, canActivate: [AuthGuard], data: { roles: ['USER','ADMIN','CHECKER'] } },
  { path: 'export', component: ExportComponent,canActivateChild:[AuthGuard],data:{roles:['ADMIN','USER']}},
      { path: 'register', component: UserRegistrationComponent },
      {path:'dashboard',component:DASHBOARDComponent}
    ]
    
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
