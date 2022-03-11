import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ProgressDisplayService } from '../progressDisplay/progress-display.service';
@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {
  constructor (private router: Router, private snackBar: MatSnackBar, private progressBarService: ProgressDisplayService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => {
      console.log(error);
      if (error.status === 401 || error.status === 403) {
        this.snackBar.open('You are unauthorized', 'OK', {duration: 5000});
      } else {
        this.snackBar.open('There was a problem processing the request.', 'OK', {duration: 4000});
      }
      return throwError(() => new Error(`${error.status} : ${error.message}`));
    }));
  }
}
