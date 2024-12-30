import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../SERVICE/meeting.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MeetingComponent } from '../meeting/meeting.component';
import { AuthService } from '../../SERVICE/auth.service';
import { Router } from '@angular/router';
import { MeetingDetailsComponent } from '../meeting-details/meeting-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';
interface SubmenuItem {
  label: string;
  roles: string[];
  action: string;
}

interface Menu {
  name: string;
  route: string;
  submenu: SubmenuItem[]; // Use the defined interface here
  isOpen: boolean;
  roles: string[];
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: { ngSkipHydration: 'true' }
  
})
export class HomeComponent implements OnInit {
  constructor(private authService:AuthService,private router:Router,private snackBar:MatSnackBar){}
  menus: Menu[] = [
    { name: 'Dashboard', route: 'home', submenu: [{
      label: 'PRODUCT', roles: ['ADMIN', 'USER'],
      action: ''
    }, {
      label: 'DATE', roles: ['ADMIN'],
      action: ''
    }], isOpen: false, roles: ['ADMIN', 'USER'] },
    { name: 'Settings', route: 'settings', submenu: [{
      label: 'User_Creation', roles: ['CHECKER', 'ADMIN'],
      action: ''
    }, {
      label: 'Account', roles: ['ADMIN'],
      action: ''
    }], isOpen: false, roles: ['ADMIN', 'USER'] },
    { name: 'Reports', route: 'home', submenu: [{
      label: 'StateWise Disbursement', roles: ['ADMIN'],
      action: ''
    }, {
      label: 'PRM REPORT', roles: ['ADMIN', 'CHECKER'],
      action: ''
    }], isOpen: false, roles: ['ADMIN'] },
    { name: 'PRM Details', route: 'home', submenu: [{
      label: 'Add Meeting', roles: ['ADMIN','CHECKER'],
      action: ''
    }, {
      label: 'Update Meeting', roles: ['ADMIN','USER','CHECKER'],
      action: ''
    }, {
      label: 'Mis Update', roles: ['ADMIN','CHECKER'],
      action: ''
    },{
      label:'User_Master',roles:['ADMIN','CHECKER'],
      action:''
    }], isOpen: false, roles: ['ADMIN'] }
    
  ];

 

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Mapping of submenu labels to routes
  private submenuRoutes: { [key: string]: string } = {
    'Add Meeting': 'meeting',
    'Update Meeting': 'update-meeting',
    'Mis Update': 'misupdate',
    'Profile': 'profile',
    'Account': 'account',
    'StateWise Disbursement': 'dashboard',
    'PRM REPORT': 'reports',
    'PRODUCT': 'graph',
    'DATE': 'bargap',
    'User_Creation':'register',
    'User_Master':'user'
  };

  // Check if the USER has the required role for a menu/submenu
  private hasAccess(requiredRoles: string[]): boolean {
    const USERRole = this.authService.getUserRole() as string // Get the current USER's role
    return requiredRoles.includes(USERRole); // Check if USER's role is in the required roles
  }

  // Handle menu click
  navigate(menu: Menu) {
    if (this.hasAccess(menu.roles)) {
      this.router.navigate([menu.route]); // Navigate to the menu's route
      this.menus.forEach(m => m.isOpen = false); // Close all submenus
    } else {
      this.showUnauthorizedAccess(); // Show unauthorized access message
    }
  }

  // Handle submenu click
  navigateSubmenu(submenu: SubmenuItem) {
    if (this.hasAccess(submenu.roles)) {
      const route = this.submenuRoutes[submenu.label];
      if (route) {
        this.router.navigate([route]); // Navigate to the submenu's route
      }
    } else {
      this.showUnauthorizedAccess(); // Show unauthorized access message
    }
    this.menus.forEach(menu => menu.isOpen = false); // Close all submenus
  }

  // Show unauthorized access snackbar
  private showUnauthorizedAccess(): void {
    this.snackBar.open('You do not have access to this resource.', 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  // Toggle submenu visibility
  toggleSubmenu(menu: Menu) {
    this.menus.forEach(m => {
      if (m !== menu) {
        m.isOpen = false;
      }
    });
    menu.isOpen = !menu.isOpen;
  }


 
}

