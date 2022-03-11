import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ReportRepositoryService {
  constructor(private httpService: HttpService) { }
  resource: string = 'Report';
  getCounts(): Observable<any> {
    return this.httpService.get(`${this.resource}/count`, {});
  }
  getVisitCountRange (startDate: string, endDate: string) : Observable<any> {
    const date = new Date();
    const today = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    const dateRange = {
      startDate: !startDate ? today : startDate,
      endDate: !endDate ? today : endDate
    };
    return this.httpService.get(`${this.resource}/getVisitCountRange`, dateRange);
  }
}
