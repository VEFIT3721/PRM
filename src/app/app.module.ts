import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select'; 
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio'; 
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './COMPONENT/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserRegistrationComponent } from './COMPONENT/user-registration/user-registration.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { HomeComponent } from './COMPONENT/home/home.component';
import { MeetingComponent } from './COMPONENT/meeting/meeting.component';
import { HasRoleDirective } from './hasRole.directive';
import { MeetingDetailsComponent } from './COMPONENT/meeting-details/meeting-details.component';
import { ExportComponent } from './COMPONENT/export/export.component';
import { DatePipe } from '@angular/common';
import { DASHBOARDComponent } from './COMPONENT/dashboard/dashboard.component';
<<<<<<< HEAD
import { MISUPDATEComponent } from './COMPONENT/misupdate/misupdate.component';
import { ForgotComponent } from './COMPONENT/forgot/forgot.component';
import { ResetPasswordComponent } from './COMPONENT/reset-password/reset-password.component';
import { UsermasterComponent } from './COMPONENT/usermaster/usermaster.component';
=======
import { AuthInterceptor } from './auth.interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MISUPDATEComponent } from './COMPONENT/misupdate/misupdate.component';
>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserRegistrationComponent,
    HomeComponent,  
    MeetingComponent,
    HasRoleDirective,
    MeetingDetailsComponent,
    ExportComponent,
    DASHBOARDComponent,
<<<<<<< HEAD
    MISUPDATEComponent,
    ForgotComponent,
    ResetPasswordComponent,
    UsermasterComponent
=======
    MISUPDATEComponent
>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatDialogModule,
<<<<<<< HEAD
    ToastrModule.forRoot({
      timeOut: 3000,  // Delay in milliseconds before toast disappears
     closeButton: true, // Add a close button
     progressBar: true, // Display a progress bar
     positionClass: 'toast-top-right', // Position (e.g., 'toast-top-right', 'toast-bottom-full-width'),
   }),
=======
    MatPaginatorModule,
    MatProgressBarModule, 
  
    
    ToastrModule.forRoot({
      timeOut: 3000,
  positionClass: 'toast-top-right',
  preventDuplicates: true,
  progressBar: true,
    }), // Add ToastrModule to imports
>>>>>>> e632e89d2ec4c1d61e17a7fdf59b1897d1a5a8cf
    MatSnackBarModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatProgressBarModule,
  ],
  
  providers: [
    DatePipe,
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
