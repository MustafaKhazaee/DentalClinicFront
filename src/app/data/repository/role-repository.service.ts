import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/http/http.service';
@Injectable({ providedIn: 'root' })
export class RoleRepositoryService {
  constructor (private httpService: HttpService) { }
  resource: string = 'Role';
  getRoles(rolenameSearchKey: string, pagingFiler: PageEvent): Observable<any> {
    let params = {
      "rolename": rolenameSearchKey ? rolenameSearchKey : null,
      "pageIndex": pagingFiler ? pagingFiler.pageIndex : 0,
      "pageSize": pagingFiler ? pagingFiler.pageSize : 10,
    }
    return this.httpService.get(this.resource, params);
  }
  getAllRoles = () : Observable<any> => this.httpService.get(this.resource+"/All", {});
  addRole = (form: any) : Observable<any> => {
    let a = Object.keys(form.permissions);
    let b = Object.values(form.permissions);
    let params = {
      "rolename": form.rolename,
    }
    let permissions = new Array<string>()
    for (let i = 0; i < a.length; i++)
      if (b[i])
        permissions.push(a[i]);
    return this.httpService.post(this.resource, params, permissions);
  }
  editRole = (form: any, id: string) : Observable<any> => {
    let a = Object.keys(form.permissions);
    let b = Object.values(form.permissions);
    let params = {
      "Id": id,
      "rolename": form.rolename,
    }
    let permissions = new Array<string>()
    for (let i = 0; i < a.length; i++)
      if (b[i])
        permissions.push(a[i]);
    return this.httpService.put(this.resource, params, permissions);
  }
  deleteRole = (id: string) : Observable<any> => this.httpService.del(this.resource, {Id: id});
}
