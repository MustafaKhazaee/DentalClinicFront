import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
@Injectable()
export class NavigationGuard implements CanLoad {
  constructor (private authenticationService: AuthenticationService, private router: Router) { }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.authenticationService.getCurrentUser().isLoggedIn) {
      this.router.navigate(["/Login"]);
      return false;
    }
    return true;
  }
}
