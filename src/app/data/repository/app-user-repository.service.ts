import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/http/http.service';
import { AppUser } from '../models/app-user';
@Injectable({ providedIn: 'root' })
export class AppUserRepositoryService {
  resource: string = 'AppUser';
  constructor(private httpService: HttpService) {}
  getUsers(usernameSearchKey: string, pagingFiler: PageEvent): Observable<any> {
    let params = {
      "username": usernameSearchKey ? usernameSearchKey : null,
      "pageIndex": pagingFiler ? pagingFiler.pageIndex : 0,
      "pageSize": pagingFiler ? pagingFiler.pageSize : 10,
    }
    return this.httpService.get(this.resource, params);
  }
  getUnassignedUsers = (userType: string) => this.httpService.get(`${this.resource}/all${userType}`, {});
  addUser = (user: any) : Observable<any> => {
    let body = {
      username: user.userName,
      password: user.password,
      usertype: user.userType,
      isLocked: user.isLocked
    }
    return this.httpService.post(this.resource, user, body);
  }
  editUser = (user: any, id: string) : Observable<any> => {
    let body = {
      id: id,
      username: user.userName,
      password: user.password,
      usertype: user.userType,
      isLocked: user.isLocked
    }
    return this.httpService.put(this.resource, user, body);
  }
  deleteUser = (id: string) : Observable<any> => this.httpService.del(this.resource, {Id: id});
}
