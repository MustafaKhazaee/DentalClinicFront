import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanLoad, Router, Route, UrlSegment, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
@Injectable()
export class RoleGuard implements CanLoad, CanActivateChild {
  constructor(private authenticationService: AuthenticationService, private snackBar: MatSnackBar) { }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let route = childRoute.routeConfig?.path+"";
    let permission: boolean = route === "" ? this.authenticationService.checkPermission(state.url.split("/")[2]) :
      this.authenticationService.checkPermission("/"+route);
    console.log(route);
    if (!permission)
      this.snackBar.open('You are not authorized to access this page!', 'OK', {duration: 5000});
    return permission;
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let permission: boolean = segments.length === 1 ? this.authenticationService.checkPermission(segments[0]+"") :
        this.authenticationService.checkPermission(`/${segments[1]}`);
    console.log(segments);
    if (!permission)
      this.snackBar.open('You are not authorized to access this page!', 'OK', {duration: 5000});
    return permission;
  }
}
