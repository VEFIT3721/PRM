import { Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './SERVICE/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({
  selector: '[hasRole]'
})
export class HasRoleDirective {
  @Input()
  hasRole!: string[]; // Array of required roles
  
  private disabledClass = 'disabled';


  constructor(private authService: AuthService, private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef,private snackBar:MatSnackBar,private el: ElementRef,
    private renderer: Renderer2,) {}

  ngOnInit() {
    const userRole = this.authService.getUserRole();
    if (userRole && this.hasRole.includes(userRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef); // Display element if authorized
    } else {
      this.viewContainer.clear(); // Hide element if not authorized
      // this.snackBar.open('You do not have access to this section.', 'Close', {
      //   duration: 2000, // Duration in milliseconds
      //   horizontalPosition: 'right',
      //   verticalPosition: 'top'
      // });
    }
  }
}
