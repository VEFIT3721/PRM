import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './COMPONENT/user-registration/user-registration.component';
import { LoginComponent } from './COMPONENT/login/login.component';
import { MeetingComponent } from './COMPONENT/meeting/meeting.component';
import { HomeComponent } from './COMPONENT/home/home.component';
import { AuthGuard } from './GUARDS/auth.guard';
import { MeetingDetailsComponent } from './COMPONENT/meeting-details/meeting-details.component';
import { ExportComponent } from './COMPONENT/export/export.component';



const routes: Routes = [{path:'register',component:UserRegistrationComponent},
  { path: 'login', component: LoginComponent },
{path: '', component:LoginComponent, pathMatch: 'full' },
{path:'meeting',component:MeetingComponent,canActivate:[AuthGuard],data: { roles: ['Admin'] }},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['maker', 'Admin'] } },
  { path: 'edit', component: MeetingDetailsComponent, canActivate: [AuthGuard], data: { roles: ['maker'] } },
  { path: 'export', component: ExportComponent },
  {path:'register',component: UserRegistrationComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
