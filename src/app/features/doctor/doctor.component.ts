import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromEvent, debounceTime, map, take } from 'rxjs';
import { AppTextService } from 'src/app/core/appTextService/app-text.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { ProgressDisplayService } from 'src/app/core/progressDisplay/progress-display.service';
import { PagedResult } from 'src/app/data/models/common/paged-result';
import { Doctor } from 'src/app/data/models/doctor';
import { RepositoryService } from 'src/app/data/repository/repository.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  constructor(private overlay: Overlay , private repository: RepositoryService, private dilaog: MatDialog, private snackBar: MatSnackBar,
    private appText: AppTextService, private authenticationService: AuthenticationService, private progressBarService: ProgressDisplayService) {
    this.canEdit = this.authenticationService.checkPermission("/EditDoctor");
    this.canDelete = this.authenticationService.checkPermission("/DeleteDoctor");
  }
  canEdit!: boolean;
  canDelete!: boolean;
  table!: PagedResult<Doctor>;
  dataLoaded: boolean = false;
  firstNameChangeEvent!: any; lastNameChangeEvent!: any;
  firstnameSearchKey!: string; lastnameSearchKey!: string;
  Texts = this.appText.getAppTexts();
  excludedColumns: Array<string> = ['id', 'createdBy', 'createdDate', 'lastModifiedBy', 'lastModifiedDate', 'isDeleted',
    'appUser', 'visits', 'appUserId'
  ];
  pagingFilter!: PageEvent;
  @ViewChild('firstname', { static: true }) firstname: any;
  @ViewChild('lastname', { static: true }) lastname: any;
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
    this.fetchData();
  }
  fetchData = () => this.repository.DoctorRepository.getDoctors(
      this.firstnameSearchKey, this.lastnameSearchKey, this.pagingFilter).pipe(
    map((r) => {
      this.table = r as PagedResult<Doctor>;
      this.dataLoaded = true;
      this.progressBarService.hideProgressbar();
    }),
    take(1)
  ).subscribe();
  editDoctor (doctor: Doctor) {
    const scrollStrategy = this.overlay.scrollStrategies.reposition;
    const dialogRef = this.dilaog.open(DoctorFormComponent, {
      width: '320px', data: { doctor: doctor, id: (<any>doctor).id, scrollStrategy: scrollStrategy },
    });
    dialogRef.afterClosed().pipe(
      map(r => {
        if (r && r.event == 'updated') {
          this.fetchData();
          this.snackBar.open('Doctor updated succefully', 'OK', {duration: 3000});
        }
      }),
      take(1)
    ).subscribe();
  }
  deleteDoctor(doctor: Doctor) {
    const dialogRef = this.dilaog.open(DeleteDialogComponent, {
      width: '300px', height: '150px', data: { message: 'Are you sure you want to delete this doctor?'},
    });
    dialogRef.afterClosed().pipe(
      map((r) => {
        if (r.event === 'delete') {
          this.progressBarService.showProgressbar();
          this.repository.DoctorRepository.deleteDoctor((<any>doctor).id).pipe(
            map((r) => {
              this.fetchData();
              this.snackBar.open('Doctor deleted succefully', 'OK', {duration: 3000});
            }),
            take(1)
          ).subscribe();
        }
      }),
      take(1)
    ).subscribe();
  }
  showDetails (doctor: Doctor) {
    this.dilaog.open(ProfileComponent, {
      width: '500px', height: '600px', data: { model: doctor },
    });
  }
  handlePaging(paging: PageEvent) {
    this.pagingFilter = paging;
    this.fetchData();
  }
  ngOnDestroy (): void {
    this.firstNameChangeEvent.unsubscribe();
    this.lastNameChangeEvent.unsubscribe();
  }
}
