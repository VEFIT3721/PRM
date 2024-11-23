import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../SERVICE/meeting.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../SERVICE/auth.service';
import { Router } from '@angular/router';
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
export class HomeComponent  {

  constructor(private authService:AuthService,private router:Router,private snackBar:MatSnackBar){}
  menus: Menu[] = [
    { name: 'Dashboard', route: 'home', submenu: [{
      label: 'PRODUCT', roles: ['Admin', 'User'],
      action: ''
    }, {
      label: 'DATE', roles: ['Admin'],
      action: ''
    }], isOpen: false, roles: ['Admin', 'User'] },
    { name: 'Settings', route: 'settings', submenu: [{
      label: 'Profile', roles: ['User', 'Admin'],
      action: ''
    }, {
      label: 'Account', roles: ['Admin'],
      action: ''
    }], isOpen: false, roles: ['Admin', 'User'] },
    { name: 'Reports', route: 'home', submenu: [{
      label: 'StateWise Disbursement', roles: ['Admin'],
      action: ''
    }, {
      label: 'PRM REPORT', roles: ['Admin', 'maker'],
      action: ''
    }], isOpen: false, roles: ['Admin'] },
    { name: 'PRM Details', route: 'home', submenu: [{
      label: 'Add Meeting', roles: ['Admin'],
      action: ''
    }, {
      label: 'Update Meeting', roles: ['Admin','User'],
      action: ''
    }, {
      label: 'Mis Update', roles: ['Admin','maker'],
      action: ''
    }], isOpen: false, roles: ['Admin'] }
  ];

 

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Mapping of submenu labels to routes
  private submenuRoutes: { [key: string]: string } = {
    'Add Meeting': 'register',
    'Update Meeting': 'update-meeting',
    'Mis Update': 'misupdate',
    'Profile': 'profile',
    'Account': 'account',
    'StateWise Disbursement': 'dashboard',
    'PRM REPORT': 'reports',
    'PRODUCT': 'graph',
    'DATE': 'bargap',
  };

  // Check if the User has the required role for a menu/submenu
  private hasAccess(requiredRoles: string[]): boolean {
    const UserRole = this.authService.getUserRole() as string // Get the current User's role
    return requiredRoles.includes(UserRole); // Check if User's role is in the required roles
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

  // exportToExcel() {
  //       this.http.get(this.apiUrl, { responseType: 'blob' })
  //     .subscribe(blob => {
  //       const url = window.URL.createObjectURL(blob);
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.download = 'meeting_data.xlsx';
  //       link.click();
  //     });
  // }
  // Export() {
  //   this.router.navigate(['export']);
  // }
}

