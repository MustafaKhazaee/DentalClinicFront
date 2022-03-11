import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private httpClient: HttpClient ) {
    let baseUrl = environment.apiUrl;
    this.get = (url: string, params: any) : Observable<object> => httpClient.get(`${baseUrl}/${url}`, {params: params});
    this.post = (url: string, params: any, body: object) : Observable<object> => httpClient.post(`${baseUrl}/${url}`, body, {params: params});
    this.put = (url: string, params: any, body: object) : Observable<object> => httpClient.put(`${baseUrl}/${url}`, body, {params: params});
    this.del = (url: string, params: any) : Observable<Object> => httpClient.delete(`${baseUrl}/${url}`, {params: params});
  }
  get;post;put;del;
}
