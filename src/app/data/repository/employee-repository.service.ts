import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/http/http.service';
import { Employee } from '../models/employee';
@Injectable({ providedIn: 'root' })
export class EmployeeRepositoryService {
  resource: string = 'Employee';
  constructor (private httpService: HttpService) { }
  getEmployees(firstnameSearchKey: string, lastnameSearchKey: string, pagingFiler: PageEvent): Observable<any> {
    let params = {
      "firstname": firstnameSearchKey ? firstnameSearchKey : null,
      "lastname": lastnameSearchKey ? lastnameSearchKey : null,
      "pageIndex": pagingFiler ? pagingFiler.pageIndex : 0,
      "pageSize": pagingFiler ? pagingFiler.pageSize : 10,
    }
    return this.httpService.get(this.resource, params);
  }
  getAllEmployees = () => this.httpService.get(`${this.resource}/all`, null);
  addEmployee = (employee: Employee) : Observable<any> => {
    let object: any = {...employee};
    if (object.dateOfBirth) {
      let d = new Date(object.dateOfBirth);
      object.dateOfBirth = `${d.getFullYear()}-${(d.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits:2})}-${(d.getDate()).toLocaleString('en-US', {minimumIntegerDigits:2})}T00:00:00`;
    }
    return this.httpService.post(this.resource, null, object);
  }
  editEmployee (employee: Employee, id: string) : Observable<any> {
    let object: any = {...employee};
    if (object.dateOfBirth) {
      let d = new Date(object.dateOfBirth);
      object.dateOfBirth = `${d.getFullYear()}-${(d.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits:2})}-${(d.getDate()).toLocaleString('en-US', {minimumIntegerDigits:2})}T00:00:00`;
    }
    return this.httpService.put(this.resource, {Id: id}, object);
  }
  deleteEmployee = (id: string) : Observable<any> => this.httpService.del(this.resource, {Id: id});
}
