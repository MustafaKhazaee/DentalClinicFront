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
import { Employee } from 'src/app/data/models/employee';
import { RepositoryService } from 'src/app/data/repository/repository.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  constructor(private overlay: Overlay , private repository: RepositoryService, private dilaog: MatDialog,
     private snackBar: MatSnackBar, private appText: AppTextService, private authenticationService: AuthenticationService,
     private progressBarService: ProgressDisplayService) {
    this.canEdit = this.authenticationService.checkPermission("/EditEmployee");
    this.canDelete = this.authenticationService.checkPermission("/DeleteEmployee");
  }
  canEdit!: boolean;
  canDelete!: boolean;
  table!: PagedResult<Employee>;
  Texts = this.appText.getAppTexts();
  dataLoaded: boolean = false;
  firstNameChangeEvent!: any; lastNameChangeEvent!: any;
  firstnameSearchKey!: string; lastnameSearchKey!: string;
  excludedColumns: Array<string> = ['id', 'createdBy', 'createdDate', 'lastModifiedBy', 'lastModifiedDate', 'isDeleted',
    'appUser', 'appUserId'
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
  fetchData = () => this.repository.EmployeeRepository.getEmployees(
      this.firstnameSearchKey, this.lastnameSearchKey, this.pagingFilter).pipe(
    map((r) => {
      this.table = r as PagedResult<Employee>;
      this.dataLoaded = true;
      this.progressBarService.hideProgressbar();
    }),
    take(1)
  ).subscribe();
  editEmployee (employee: Employee) {
    const scrollStrategy = this.overlay.scrollStrategies.reposition;
    if ((<any>employee).firstName === 'Mustafa' && (<any>employee).lastName === 'Khazaee') {
      this.snackBar.open('You cannot edit system admin!', 'Close', {duration: 6000});
    } else {
      const dialogRef = this.dilaog.open(EmployeeFormComponent, {
        width: '320px', data: { employee: employee, id: (<any>employee).id, scrollStrategy: scrollStrategy },
      });
      dialogRef.afterClosed().pipe(
        map(r => {
          if (r && r.event == 'updated') {
            this.fetchData();
            this.snackBar.open('Employee updated succefully', 'OK', {duration: 3000});
          }
        }),
        take(1)
      ).subscribe();
    }
  }
  deleteEmployee(employee: Employee) {
    if ((<any>employee).firstName === 'Mustafa' && (<any>employee).lastName === 'Khazaee') {
      this.snackBar.open('You cannot delete system admin!', 'Close', {duration: 6000});
    } else {
      const dialogRef = this.dilaog.open(DeleteDialogComponent, {
        width: '300px', height: '150px', data: { message: 'Are you sure you want to delete this employee?'},
      });
      dialogRef.afterClosed().pipe(
        map((r) => {
          if (r && r.event === 'delete') {
            this.progressBarService.showProgressbar();
            this.repository.EmployeeRepository.deleteEmployee((<any>employee).id).pipe(
              map((r) => {
                this.fetchData();
                this.snackBar.open('Employee deleted succefully', 'OK', {duration: 3000});
              }),
              take(1)
            ).subscribe();
          }
        }),
        take(1)
      ).subscribe();
    }
  }
  showDetails (employee: Employee) {
    this.dilaog.open(ProfileComponent, {
      width: '500px', height: '600px', data: { model: employee },
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
