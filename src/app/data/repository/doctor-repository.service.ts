import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/http/http.service';
import { Doctor } from '../models/doctor';
@Injectable({ providedIn: 'root' })
export class DoctorRepositoryService {
  resource: string = 'Doctor';
  constructor (private httpService: HttpService) { }
  getDoctors(firstnameSearchKey: string, lastnameSearchKey: string, pagingFiler: PageEvent): Observable<any> {
    let params = {
      "firstname": firstnameSearchKey ? firstnameSearchKey : null,
      "lastname": lastnameSearchKey ? lastnameSearchKey : null,
      "pageIndex": pagingFiler ? pagingFiler.pageIndex : 0,
      "pageSize": pagingFiler ? pagingFiler.pageSize : 10,
    }
    return this.httpService.get(this.resource, params);
  }
  getAllDoctors = () => this.httpService.get(`${this.resource}/all`, null);
  addDoctor = (doctor: Doctor) : Observable<any> => {
    let object: any = {...doctor};
    if (object.dateOfBirth) {
      let d = new Date(object.dateOfBirth);
      object.dateOfBirth = `${d.getFullYear()}-${(d.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits:2})}-${(d.getDate()).toLocaleString('en-US', {minimumIntegerDigits:2})}T00:00:00`;
    }
    return this.httpService.post(this.resource, null, object);
  }
  editDoctor (doctor: Doctor, id: string) : Observable<any> {
    let object: any = {...doctor};
    if (object.dateOfBirth) {
      let d = new Date(object.dateOfBirth);
      object.dateOfBirth = `${d.getFullYear()}-${(d.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits:2})}-${(d.getDate()).toLocaleString('en-US', {minimumIntegerDigits:2})}T00:00:00`;
    }
    return this.httpService.put(this.resource, {Id: id}, object);
  }
  deleteDoctor = (id: string) : Observable<any> => this.httpService.del(this.resource, {Id: id});
}
