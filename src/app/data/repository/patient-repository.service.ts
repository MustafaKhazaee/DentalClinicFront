import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/http/http.service';
import { Patient } from '../models/patient';
@Injectable({ providedIn: 'root' })
export class PatientRepositoryService {
  resource: string = 'Patient';
  constructor (private httpService: HttpService) { }
  getPatients(firstnameSearchKey: string, lastnameSearchKey: string, mobile: string, pagingFiler: PageEvent): Observable<any> {
    let params = {
      "firstname": firstnameSearchKey ? firstnameSearchKey : null,
      "lastname": lastnameSearchKey ? lastnameSearchKey : null,
      "mobile": mobile ? mobile : null,
      "pageIndex": pagingFiler ? pagingFiler.pageIndex : 0,
      "pageSize": pagingFiler ? pagingFiler.pageSize : 10,
    }
    return this.httpService.get(this.resource, params);
  }
  getAllPatients = () => this.httpService.get(`${this.resource}/all`, null);
  addPatient = (patient: Patient) : Observable<any> => this.httpService.post(this.resource, null, patient);
  editPatient (patient: Patient, id: string) : Observable<any> {
    return this.httpService.put(this.resource, {Id: id}, patient);
  }
  deletePatient = (id: string) : Observable<any> => this.httpService.del(this.resource, {Id: id});
}
