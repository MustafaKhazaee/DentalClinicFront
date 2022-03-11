import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromEvent, debounceTime, map, take } from 'rxjs';
import { AppTextService } from 'src/app/core/appTextService/app-text.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { ProgressDisplayService } from 'src/app/core/progressDisplay/progress-display.service';
import { PagedResult } from 'src/app/data/models/common/paged-result';
import { Patient } from 'src/app/data/models/patient';
import { RepositoryService } from 'src/app/data/repository/repository.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  constructor(private repository: RepositoryService, private dilaog: MatDialog, private snackBar: MatSnackBar,
    private appText: AppTextService, private authenticationService: AuthenticationService, private progressBarService: ProgressDisplayService) {
    this.canEdit = this.authenticationService.checkPermission("/EditPatient");
    this.canDelete = this.authenticationService.checkPermission("/DeletePatient");
  }
  canEdit!: boolean;
  canDelete!: boolean;
  table!: PagedResult<Patient>;
  Texts = this.appText.getAppTexts();
  dataLoaded: boolean = false;
  firstNameChangeEvent!: any; lastNameChangeEvent!: any; mobileChangeEvent!: any;
  firstnameSearchKey!: string; lastnameSearchKey!: string; mobileSearchKey!: string;
  excludedColumns: Array<string> = ['id', 'createdBy', 'createdDate', 'lastModifiedBy', 'lastModifiedDate', 'isDeleted', 'visits'];
  pagingFilter!: PageEvent;
  @ViewChild('firstname', { static: true }) firstname: any;
  @ViewChild('lastname', { static: true }) lastname: any;
  @ViewChild('mobile', { static: true }) mobile: any;
  ngOnInit(): void {
    this.progressBarService.showProgressbar();
    this.firstNameChangeEvent = fromEvent(this.firstname.nativeElement, 'keyup').pipe(
      debounceTime(1000),
      map((r) => {
        this.firstnameSearchKey = ((r as Event).target as any)['value'].trim();
        this.fetchData();
      })
    ).subscribe();
    this.lastNameChangeEvent = fromEvent(this.lastname.nativeElement, 'keyup').pipe(
      debounceTime(1000),
      map((r) => {
        this.lastnameSearchKey = ((r as Event).target as any)['value'].trim();
        this.fetchData();
      })
    ).subscribe();
    this.mobileChangeEvent = fromEvent(this.mobile.nativeElement, 'keyup').pipe(
      debounceTime(1000),
      map((r) => {
        this.mobileSearchKey = ((r as Event).target as any)['value'].trim();
        this.fetchData();
      })
    ).subscribe();
    this.fetchData();
  }
  fetchData = () => this.repository.PatientRepository.getPatients(
      this.firstnameSearchKey, this.lastnameSearchKey, this.mobileSearchKey, this.pagingFilter).pipe(
    map((r) => {
      this.table = r as PagedResult<Patient>;
      this.dataLoaded = true;
      this.progressBarService.hideProgressbar();
    }),
    take(1)
  ).subscribe();
  editPatient (patient: Patient) {
    const dialogRef = this.dilaog.open(PatientFormComponent, {
      width: '320px', data: { patient: patient, id: (<any>patient).id},
    });
    dialogRef.afterClosed().pipe(
      map(r => {
        if (r && r.event == 'updated') {
          this.fetchData();
          this.snackBar.open('Patient updated succefully', 'OK', {duration: 3000});
        }
      }),
      take(1)
    ).subscribe();
  }
  deletePatient(patient: Patient) {
    const dialogRef = this.dilaog.open(DeleteDialogComponent, {
      width: '300px', height: '150px', data: { message: 'Are you sure you want to delete this patient?'},
    });
    dialogRef.afterClosed().pipe(
      map((r) => {
        if (r.event === 'delete') {
          this.progressBarService.showProgressbar();
          this.repository.PatientRepository.deletePatient((<any>patient).id).pipe(
            map((r) => {
              this.fetchData();
              this.snackBar.open('Patient deleted succefully', 'OK', {duration: 3000});
            }),
            take(1)
          ).subscribe();
        }
      }),
      take(1)
    ).subscribe();
  }
  showDetails (patient: Patient) {
    this.dilaog.open(ProfileComponent, {
      width: '500px', height: '600px', data: { model: patient },
    });
  }
  handlePaging(paging: PageEvent) {
    this.pagingFilter = paging;
    this.fetchData();
  }
  ngOnDestroy (): void {
    this.firstNameChangeEvent.unsubscribe();
    this.lastNameChangeEvent.unsubscribe();
    this.mobileChangeEvent.unsubscribe();
  }
}
