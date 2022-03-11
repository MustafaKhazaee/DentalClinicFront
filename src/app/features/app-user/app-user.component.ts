import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, take, fromEvent, debounceTime } from 'rxjs';
import { AppTextService } from 'src/app/core/appTextService/app-text.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { ProgressDisplayService } from 'src/app/core/progressDisplay/progress-display.service';
import { AppUser } from 'src/app/data/models/app-user';
import { PagedResult } from 'src/app/data/models/common/paged-result';
import { RepositoryService } from 'src/app/data/repository/repository.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';
import { AppUserFormComponent } from './app-user-form/app-user-form.component';
@Component({
  selector: 'app-app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.scss'],
})
export class AppUserComponent implements OnInit, OnDestroy {
  constructor(private repository: RepositoryService, private dilaog: MatDialog, private snackBar: MatSnackBar,
    private appText: AppTextService, private authenticationService: AuthenticationService, private progressBarService: ProgressDisplayService) {
      this.canEdit = this.authenticationService.checkPermission("/EditAppUser");
      this.canDelete = this.authenticationService.checkPermission("/DeleteAppUser");
    }
  canEdit!: boolean;
  canDelete!: boolean;
  table!: PagedResult<AppUser>;
  dataLoaded: boolean = false;
  userNameChangeEvent!: any;
  usernameSearchKey!: string;
  excludedColumns: Array<string> = ['createdBy', 'appUserRoles', 'id', 'createdDate', 'lastModifiedBy', 'lastModifiedDate', 'password', 'salt'];
  pagingFilter!: PageEvent;
  Texts = this.appText.getAppTexts();
  @ViewChild('username', { static: true }) username: any;
  ngOnInit(): void {
    this.progressBarService.showProgressbar();
    this.userNameChangeEvent = fromEvent(this.username.nativeElement, 'keyup').pipe(
      debounceTime(1000),
      map((r) => {
        this.usernameSearchKey =
        ((r as Event).target as any)['value'].trim();
        this.fetchData();
      })
    ).subscribe();
    this.fetchData();
  }
  fetchData = () => this.repository.AppUserRepository.getUsers(this.usernameSearchKey, this.pagingFilter).pipe(
    map((r) => {
      this.table = r as PagedResult<AppUser>;
      this.dataLoaded = true;
      this.progressBarService.hideProgressbar();
    }),
    take(1)
  ).subscribe();
  editAppUser (appUser: AppUser) {
    if ((<any>appUser).userName === 'mustafa') {
      this.snackBar.open('You cannot edit system admin!', 'Close', {duration: 6000});
    } else {
      const dialogRef = this.dilaog.open(AppUserFormComponent, {
        width: '320px', data: { appUser: appUser, id: (<any>appUser).id },
      });
      dialogRef.afterClosed().pipe(
        map(r => {
          if (r && r.event == 'updated') {
            this.fetchData();
            this.snackBar.open('User updated succefully', 'OK', {duration: 3000});
          }
        }),
        take(1)
      ).subscribe();
    }
  }
  deleteAppUser(appUser: AppUser) {
    if ((<any>appUser).userName === 'mustafa') {
      this.snackBar.open('You cannot delete system admin!', 'Close', {duration: 6000});
    } else {
      const dialogRef = this.dilaog.open(DeleteDialogComponent, {
        width: '300px', height: '150px', data: { message: 'Are you sure you want to delete this user?'},
      });
      dialogRef.afterClosed().pipe(
        map((r) => {
          if (r.event === 'delete') {
            this.progressBarService.showProgressbar();
            this.repository.AppUserRepository.deleteUser((<any>appUser).id).pipe(
              map((r) => {
                this.fetchData();
                this.snackBar.open('User deleted succefully', 'OK', {duration: 3000});
              }),
              take(1)
            ).subscribe();
          }
        }),
        take(1)
      ).subscribe();
    }
  }
  showDetails (appUser: AppUser) {
    this.dilaog.open(ProfileComponent, {
      width: '500px', height: '600px', data: { model: appUser },
    });
  }
  handlePaging(paging: PageEvent) {
    this.pagingFilter = paging;
    this.fetchData();
  }
  ngOnDestroy = (): void => {
    this.userNameChangeEvent.unsubscribe();
  }
}
