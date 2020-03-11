import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeePunchDetailGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let id = +next.url[2].path;
      let employeeid = +next.url[3].path;

      if (isNaN(id)) {
        alert("Invalid Punch Id");
        this.router.navigate(['/employees/punches/', employeeid]);
        return false;
      }

      if (isNaN(employeeid)) {
        alert("Invalid Employee Id");
        this.router.navigate(['/employees']);
        return false;
      }
    return true;
  }
  
}
