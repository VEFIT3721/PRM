import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {

  constructor(private router: Router) { }
   reloadCurrentPage() {

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

      this.router.navigate([`/${this.router.url}`]).then(() => {

        console.log(`After navigation I am on: ${this.router.url}`);

      });

    });

  }
}
