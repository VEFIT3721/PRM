import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
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
import { ToastrModule } from 'ngx-toastr'; // Import ToastrModule
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';



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
import { AuthInterceptor } from './auth.interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MISUPDATEComponent } from './COMPONENT/misupdate/misupdate.component';

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
    MISUPDATEComponent
  ],
  imports: [
    BrowserModule,
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
    MatPaginatorModule,
    MatProgressBarModule, 
  
    
    ToastrModule.forRoot({
      timeOut: 3000,
  positionClass: 'toast-top-right',
  preventDuplicates: true,
  progressBar: true,
    }), // Add ToastrModule to imports
    MatSnackBarModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
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
