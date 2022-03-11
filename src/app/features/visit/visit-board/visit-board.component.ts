import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { AppTextService } from 'src/app/core/appTextService/app-text.service';
import { ProgressDisplayService } from 'src/app/core/progressDisplay/progress-display.service';
import { VisitBoardService } from 'src/app/core/visitBoardService/visit-board.service';
import { PagedResult } from 'src/app/data/models/common/paged-result';

@Component({
  selector: 'app-visit-board',
  templateUrl: './visit-board.component.html',
  styleUrls: ['./visit-board.component.scss']
})
export class VisitBoardComponent implements OnInit, OnDestroy {
  table!: PagedResult<any>;
  Texts = this.appText.getAppTexts();
  dataLoaded: boolean = false;
  excludedColumns: Array<string> = ['id', 'doctorId', 'patientId', 'createdBy', 'createdDate', 'priorityLevel',
   'lastModifiedBy', 'lastModifiedDate', 'isDeleted', 'doctor', 'patient', 'operation', 'preOperationFee', 'postOperationFee'
    , 'doneDate', 'description'];
   operations = ["TakeOut", "Fill", "Orthodontics", "Cleaning", "Cover"];
  constructor(private visitBoardService: VisitBoardService, private appText: AppTextService,
    private progressBarService: ProgressDisplayService) { }
  liveVisitBoard!: Subscription;
  ngOnInit(): void {
    this.liveVisitBoard = this.visitBoardService.onReceiveUpdates().pipe(
      map(r => {
        let t = r as any;
        t.list.forEach((i: any) => {
          i["Doctor Name"] = `${i.doctor.firstName} ${i.doctor.lastName}`;
          i["Patient Name"] = `${i.patient.firstName} ${i.patient.lastName}`;
          i["Operation Type"] = `${this.operations[i.operation]}`;
        });
        this.table = t;
        if (!this.dataLoaded) this.dataLoaded = true;
      })
    ).subscribe();
    setTimeout(() => this.progressBarService.hideProgressbar());
  }
  ngOnDestroy = () : void => this.liveVisitBoard.unsubscribe();
}
