import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromEvent, debounceTime, map, take } from 'rxjs';
import { AppTextService } from 'src/app/core/appTextService/app-text.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { ProgressDisplayService } from 'src/app/core/progressDisplay/progress-display.service';
import { PagedResult } from 'src/app/data/models/common/paged-result';
import { Visit } from 'src/app/data/models/visit';
import { RepositoryService } from 'src/app/data/repository/repository.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';
import { VisitFormComponent } from './visit-form/visit-form.component';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss']
})
export class VisitComponent implements OnInit {
  constructor(private repository: RepositoryService, private dilaog: MatDialog, private snackBar: MatSnackBar,
    private appText: AppTextService, private authenticationService: AuthenticationService,
    private progressBarService: ProgressDisplayService) {
      this.canEdit = this.authenticationService.checkPermission("/EditVisit");
      this.canDelete = this.authenticationService.checkPermission("/DeleteVisit");
    }
  canEdit!: boolean;
  canDelete!: boolean;
  table!: PagedResult<Visit>;
  showPortal: boolean = false;
  Texts = this.appText.getAppTexts();
  dataLoaded: boolean = false;
  patientNameChangeEvent!: any; patientMobileChangeEvent!: any; doctorNameChangeEvent!: any;
  patientNameSearchKey!: string; patientMobileSearchKey!: string; doctorNameSearchKey!: string;
  excludedColumns: Array<string> = ['id','patient','doctor', 'doctorId', 'patientId', 'createdBy', 'createdDate', 'lastModifiedBy', 'lastModifiedDate', 'isDeleted'];
  pagingFilter!: PageEvent;
  @ViewChild('patientName', { static: true }) patientName: any;
  @ViewChild('patientMobile', { static: true }) patientMobile: any;
  @ViewChild('doctorName', { static: true }) doctorName: any;
  ngOnInit(): void {
    this.progressBarService.showProgressbar();
    this.setSearchInputListeners();
    this.fetchData();
  }
  fetchData = () => this.repository.VisitRepository.getVisits(
      this.patientNameSearchKey, this.patientMobileSearchKey, this.doctorNameSearchKey, this.pagingFilter).pipe(
    map((r) => {
      let p = JSON.parse(JSON.stringify(r)); // Deep-Copy of r (not referencing it in p).
      p.list.forEach((i: any) => {
        i.patientMobile = i.patient.mobile;
        i.doctorName = `${i.doctor.firstName} ${i.doctor.lastName}`;
        i.patientName = `${i.patient.firstName} ${i.patient.lastName}`;
      });
      this.table = p;
      this.dataLoaded = true;
      this.progressBarService.hideProgressbar();
    }),
    take(1)
  ).subscribe();
  editVisit (visit: Visit) {
    const dialogRef = this.dilaog.open(VisitFormComponent, {
      width: '320px', data: { visit: visit, id: (<any>visit).id},
    });
    dialogRef.afterClosed().pipe(
      map(r => {
        if (r && r.event == 'updated') {
          this.fetchData();
          this.snackBar.open('Visit updated succefully', 'OK', {duration: 3000});
        }
      }),
      take(1)
    ).subscribe();
  }
  deleteVisit(visit: Visit) {
    const dialogRef = this.dilaog.open(DeleteDialogComponent, {
      width: '300px', height: '150px', data: { message: 'Are you sure you want to delete this visit?'},
    });
    dialogRef.afterClosed().pipe(
      map((r) => {
        if (r.event === 'delete') {
          this.progressBarService.showProgressbar();
          this.repository.VisitRepository.deleteVisit((<any>visit).id).pipe(
            map((r) => {
              this.fetchData();
              this.snackBar.open('Visit deleted succefully', 'OK', {duration: 3000});
            }),
            take(1)
          ).subscribe();
        }
      }),
      take(1)
    ).subscribe();
  }
  showDetails (visit: Visit) {
    this.dilaog.open(ProfileComponent, {
      width: '500px', height: '600px', data: { model: visit },
    });
  }
  handlePaging(paging: PageEvent) {
    this.pagingFilter = paging;
    this.fetchData();
  }
  private setSearchInputListeners() {
    this.patientNameChangeEvent = fromEvent(this.patientName.nativeElement, 'keyup').pipe(
      debounceTime(1000),
      map((r) => {
        this.patientNameSearchKey = ((r as Event).target as any)['value'].trim();
        this.fetchData();
      })
    ).subscribe();
    this.patientMobileChangeEvent = fromEvent(this.patientMobile.nativeElement, 'keyup').pipe(
      debounceTime(1000),
      map((r) => {
        this.patientMobileSearchKey = ((r as Event).target as any)['value'].trim();
        this.fetchData();
      })
    ).subscribe();
    this.doctorNameChangeEvent = fromEvent(this.doctorName.nativeElement, 'keyup').pipe(
      debounceTime(1000),
      map((r) => {
        this.doctorNameSearchKey = ((r as Event).target as any)['value'].trim();
        this.fetchData();
      })
    ).subscribe();
  }
  ngOnDestroy (): void {
    this.patientNameChangeEvent.unsubscribe();
    this.patientMobileChangeEvent.unsubscribe();
    this.doctorNameChangeEvent.unsubscribe();
  }
}
