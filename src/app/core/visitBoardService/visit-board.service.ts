import { Injectable } from '@angular/core';
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
  HubConnection,
  IHttpConnectionOptions,
} from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { PagedResult } from 'src/app/data/models/common/paged-result';
import { Visit } from 'src/app/data/models/visit';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class VisitBoardService {
  constructor(private authenticationService: AuthenticationService) {
    this.connectToCacheHub();
  }
  private connect: boolean = true;
  private cacheConnection!: HubConnection;
  private subject: Subject<PagedResult<Visit>> = new Subject();
  connectToCacheHub() {
    if (this.connect) {
      let options: IHttpConnectionOptions = {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      };
      let token: string = this.authenticationService.getCurrentUser().token;
      this.cacheConnection = new HubConnectionBuilder()
        .configureLogging(LogLevel.Information)
        .withUrl(`${environment.apiUrl}/liveBoardHub?token=${token}`, options)
        .withAutomaticReconnect()        .build();
      this.cacheConnection
        .start().then(() => {
          console.log('Connected to live-board hub')
          this.invokeService();
        })
        .catch((err) => console.error(err));
      this.cacheConnection.on('updateVisitBoard', (pagedResult) => {
        this.subject.next(pagedResult as PagedResult<Visit>);
      });
      this.connect = false;
    }
  }
  invokeService = () =>
    this.cacheConnection.invoke('GetTodaysVisits')
      .then(() => console.log('GetTodaysVisits Invoked!'))
      .catch((e) => console.log(e));
  onReceiveUpdates = () => this.subject.asObservable();
}
