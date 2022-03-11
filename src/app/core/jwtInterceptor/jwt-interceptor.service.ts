import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../authentication/User';
import { HubConnectionBuilder, LogLevel, HttpTransportType, HubConnection, IHttpConnectionOptions } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  cacheConnection!: HubConnection;
  connect: boolean = true;
  constructor (private authenticationService: AuthenticationService, private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user : User = this.authenticationService.getCurrentUser();
    if (user.firstName !== "empty" && user.isLoggedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        },
      });
    }
    else if (!request.url.endsWith('/api/AppUser/Login')) {
      this.router.navigate(["/Login"]);
    }
    if (this.connect && this.authenticationService.getCurrentUser().isLoggedIn) {
      this.connectToRoleDetectionHub();
    }
    return next.handle(request);
  }
  connectToRoleDetectionHub () {
    let options: IHttpConnectionOptions = {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
    }
    let token: string = this.authenticationService.getCurrentUser().token;
    this.cacheConnection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Information)
      .withUrl(`${environment.apiUrl}/roleChangeDetectionHub?token=${token}`, options)
      .withAutomaticReconnect().build();
    this.cacheConnection.start().then(() => {
      this.cacheConnection.on('logOut', () => this.authenticationService.logout());
      this.connect = false;
      console.log("Connected to roleChangeDetection hub")
    }).catch((err) => console.error(err));
  }
}
