import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpService } from '../http/http.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from './error-component/error.component';
import { Router } from '@angular/router';
import { User } from './User';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor (private httpService: HttpService, private jwtHelper: JwtHelperService, private matDialog: MatDialog, private router: Router, private snackBar: MatSnackBar) {}
  getCurrentUser () : User {
    const encodedToken = localStorage.getItem('jwtToken');
    if (encodedToken) {
      const decodedToken = this.jwtHelper.decodeToken(encodedToken);
      const tokenObject = JSON.parse(JSON.stringify(decodedToken));
      const user : User = {
        sid: tokenObject["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"],
        firstName: tokenObject["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        lastName: tokenObject["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"],
        nameIdentifier: tokenObject["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        roles: tokenObject["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        isLoggedIn: !this.jwtHelper.isTokenExpired(encodedToken),
        token: encodedToken
      }
      return user;
    } else {
      return { sid: "", firstName: "empty", lastName: "", nameIdentifier: [""], roles: [""], isLoggedIn: false, token: ""}
    }
  }
  login (loginForm: FormGroup, progressBar: {state: boolean}) {
    progressBar.state = true;
    const loginRequest = this.httpService.post("AppUser/Login",  new Object(), loginForm.value).subscribe(r => {
      const res: string = (<any>r).response;
      if (res === 'User not found' || res === 'Invalid password' || res === 'User has no role' || res === 'User has no permission' || res === 'User is locked') {
        this.matDialog.open(ErrorComponent, {width: '300px', height: '150px', data: { message: res }});
      } else {
        localStorage.removeItem('jwtToken');
        localStorage.setItem('jwtToken', res);
        let user = this.getCurrentUser();
        let person = `${user.firstName} ${user.lastName} - ${user.nameIdentifier}`
        this.router.navigate(["/Dashboard"]);
        setTimeout(() => this.snackBar.open(`Welcome ${person}`, 'Close', {duration: 6000}), 2000);
      }
      progressBar.state = false;
      loginRequest.unsubscribe();
    });
  }
  getPermissions () : Array<string> {
    let roles = this.getCurrentUser().roles;
    let permissions: Array<string> = new Array();
    let access: Array<string> = ["Get", "Add", "Edit", "Delete", "Live"];
    let resource: Array<string> = ["AppUser", "Doctor", "Employee", "Expense", "Patient", "Role", "Visit", "Report"];
    if (roles.length === 1 && roles[0] === 'r') permissions = ['r'];
    else {
      roles.forEach(r => {
        let resourceName = resource[Number(r.substr(0, r.length - 1))];
        let a = Number(r.substr(r.length - 1, r.length - 1));
        let operationName = a === 0 ? resourceName : `/${access[a]}${resourceName}`;
        permissions.push(operationName);
      });
    }
    return permissions;
  }
  checkPermission (permission: string) : boolean {
    let permissions : Array<string> = this.getPermissions();
    console.log(permissions);

    if (permission.length === 0) return false;
    return permissions.indexOf(permission) !== -1 || permissions.length > 0 && permissions[0] === 'r';
  }
  logout () {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/Login']);
  }
}
