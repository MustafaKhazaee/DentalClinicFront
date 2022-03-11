import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorComponent } from './authentication/error-component/error.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ErrorInterceptorService } from './httpErrorInterceptor/error-interceptor.service';
import { JwtInterceptorService } from './jwtInterceptor/jwt-interceptor.service';
import { NavigationGuard } from './routeGuards/navigation-guard.service';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { CacheService } from './cacheService/cache.service';
import { MatNativeDateModule } from '@angular/material/core';
import { RoleGuard } from './routeGuards/role-guard.service';
import { Translate } from './translatePipe/translate.pipe';
@NgModule({
  declarations: [
    ErrorComponent,
    Translate
  ],
  imports: [ CommonModule, MatButtonModule , MatIconModule, MatSnackBarModule, MatNativeDateModule ],
  providers: [ JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CacheService, multi: true},
     NavigationGuard, RoleGuard
  ],
  exports: [ HttpClientModule, MatDialogModule, Translate ],
})
export class CoreModule { }
