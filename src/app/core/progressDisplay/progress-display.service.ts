import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ProgressDisplayService {
  constructor () { }
  private emitChangeSource: Subject<any> = new Subject();
  progressbarStateChange = this.emitChangeSource.asObservable();
  showProgressbar = () => this.emitChangeSource.next(true);
  hideProgressbar = () => this.emitChangeSource.next(false);
}
