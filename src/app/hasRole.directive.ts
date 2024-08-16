import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './SERVICE/auth.service';

@Directive({
  selector: '[hasRole]'
})
export class HasRoleDirective {
  @Input()
    hasRole!: string[]; // Array of required roles

  constructor(private authService: AuthService, private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}

  ngOnInit() {
    const userRole = this.authService.getUserRole();
    if (userRole && this.hasRole.includes(userRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef); // Display element if authorized
    } else {
      this.viewContainer.clear(); // Hide element if not authorized
    }
  }
}
