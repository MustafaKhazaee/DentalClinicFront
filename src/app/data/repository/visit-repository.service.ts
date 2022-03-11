import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/http/http.service';
import { Visit } from '../models/visit';
@Injectable({ providedIn: 'root' })
export class VisitRepositoryService {
  resource: string = 'Visit';
  constructor (private httpService: HttpService) { }
  getVisits(patientName: string, patientMobile: string, doctorName: string, pagingFiler: PageEvent): Observable<any> {
    let params = {
      "patientName": patientName ? patientName : null,
      "patientMobile": patientMobile ? patientMobile : null,
      "doctorName": doctorName ? doctorName : null,
      "pageIndex": pagingFiler ? pagingFiler.pageIndex : 0,
      "pageSize": pagingFiler ? pagingFiler.pageSize : 10,
    }
    return this.httpService.get(this.resource, params);
  }
  addVisit = (visit: Visit) : Observable<any> => {
    let object: any = {...visit};
    return this.httpService.post(this.resource, null, object);
  }
  editVisit (visit: Visit, id: string) : Observable<any> {
    let object: any = {...visit};
    return this.httpService.put(this.resource, {Id: id}, object);
  }
  deleteVisit = (id: string) : Observable<any> => this.httpService.del(this.resource, {Id: id});
}
