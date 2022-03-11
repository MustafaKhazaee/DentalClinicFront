import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/http/http.service';
import { Expense } from '../models/expense';
@Injectable({ providedIn: 'root' })
export class ExpenseRepositoryService {
  resource: string = 'Expense';
  constructor (private httpService: HttpService) { }
  getExpenses(itemName: string, startDate: string, endDate: string, pagingFiler: PageEvent): Observable<any> {
    let params = {
      "itemName": itemName ? itemName : null,
      "startDate": startDate ? startDate : '1/1/0001 12:00:00 AM',
      "endDate": endDate ? endDate : '12/31/9999 11:59:59 PM',
      "pageIndex": pagingFiler ? pagingFiler.pageIndex : 0,
      "pageSize": pagingFiler ? pagingFiler.pageSize : 10,
    }
    return this.httpService.get(this.resource, params);
  }
  addExpense (expense: any) : Observable<any> {
    let d = new Date(expense.date);
    let a = {
      itemName: expense.itemName,
      pricePerItem: expense.pricePerItem,
      count: expense.count,
      date: expense.date ? `${d.getFullYear()}-${(d.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits:2})}-${(d.getDate()).toLocaleString('en-US', {minimumIntegerDigits:2})}T00:00:00` : null,
      description: expense.description
    }
    return this.httpService.post(this.resource, null, a);
  }
  editExpense (expense: any, id: string) : Observable<any> {
    let d = new Date(expense.date);
    let a = {
      itemName: expense.itemName,
      pricePerItem: expense.pricePerItem,
      count: expense.count,
      date: expense.date ? `${d.getFullYear()}-${(d.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits:2})}-${(d.getDate()).toLocaleString('en-US', {minimumIntegerDigits:2})}T00:00:00` : null,
      description: expense.description
    }
    return this.httpService.put(this.resource, {Id: id}, a);
  }
  deleteExpense = (id: string) : Observable<any> => this.httpService.del(this.resource, {Id: id});
}
