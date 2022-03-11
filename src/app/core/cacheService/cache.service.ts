import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnectionBuilder, LogLevel, HttpTransportType, HubConnection, IHttpConnectionOptions } from '@microsoft/signalr';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';
@Injectable({ providedIn: 'root' })
export class CacheService implements HttpInterceptor {
  private readonly store: Record<string, Observable<HttpEvent<any>>> = {};
  cacheConnection!: HubConnection;
  connect: boolean = true;
  constructor(private authenticationService: AuthenticationService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.connect && this.authenticationService.getCurrentUser().isLoggedIn) {
      this.connectToCacheHub();
      this.cacheConnection.on('invalidateCache', (resource) => {
        Object.keys(this.store).forEach(k => {
          if (k.indexOf(resource.value) > -1)
            delete this.store[k];
        });
      });
      this.connect = false;
    }
    // console.log(request.urlWithParams.indexOf('/api/Report') != -1);
    if (request.method !== "GET")
      return next.handle(request);
    if (!this.store[request.urlWithParams])
      this.store[request.urlWithParams] = next.handle(request).pipe(shareReplay(1));
    return this.store[request.urlWithParams];
  }
  connectToCacheHub () {
    let options: IHttpConnectionOptions = {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    }
    let token: string = this.authenticationService.getCurrentUser().token;
    this.cacheConnection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Information)
      .withUrl(`${environment.apiUrl}/cacheHub?token=${token}`, options)
      .withAutomaticReconnect().build();
    this.cacheConnection.start().then(() => console.log("Connected to cache hub")).catch((err) => console.error(err));
  }
}
