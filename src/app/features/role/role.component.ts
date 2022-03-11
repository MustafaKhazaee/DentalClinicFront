import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PagedResult } from 'src/app/data/models/common/paged-result';
import { map, take, fromEvent, debounceTime, Observable, Subscription } from 'rxjs';
import { Role } from 'src/app/data/models/role';
import { RepositoryService } from 'src/app/data/repository/repository.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { RoleFormComponent } from './role-form/role-form.component';
import { AppTextService } from 'src/app/core/appTextService/app-text.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { ProgressDisplayService } from 'src/app/core/progressDisplay/progress-display.service';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  constructor(private repository: RepositoryService, private dilaog: MatDialog, private snackBar: MatSnackBar,
    private appText: AppTextService, private authenticationService: AuthenticationService, private porgressBarService: ProgressDisplayService) {
      this.canEdit = this.authenticationService.checkPermission("/EditRole");
      this.canDelete = this.authenticationService.checkPermission("/DeleteRole");
    }
  canEdit!: boolean;
  canDelete!: boolean;
  table!: PagedResult<Role>;
  dataLoaded: boolean = false;
  roleChangeEvent!: any;
  roleNameSearchKey!: string;
  excludedColumns: Array<string> = ['id', 'appUserRoles', 'rolePermissions'];
  pagingFilter!: PageEvent;
  Texts = this.appText.getAppTexts();
  @ViewChild('rolename', { static: true }) rolename: any;
  ngOnInit(): void {
    this.porgressBarService.showProgressbar();
    this.roleChangeEvent = fromEvent(this.rolename.nativeElement, 'keyup').pipe(
      debounceTime(1000),
      map((r) => {
        this.roleNameSearchKey = ((r as Event).target as any)['value'].trim();
        this.fetchData();
      })
    ).subscribe();
    this.fetchData();
  }
  fetchData = () => this.repository.RoleRepository.getRoles(this.roleNameSearchKey, this.pagingFilter).pipe(
    map((r) => {
      this.table = r as PagedResult<Role>;
      this.dataLoaded = true;
      this.porgressBarService.hideProgressbar();
    }),
    take(1)
  ).subscribe();
  editRole = (role: Role) => {
    if (((<any>role).roleName == 'System Developer')) {
      this.snackBar.open('You cannot edit system developer\'s role!', 'Close', {duration: 6000});
    } else {
      const dialogRef = this.dilaog.open(RoleFormComponent, {
        width: '500px', data: { role: role, id: (<any>role).id },
      });
      dialogRef.afterClosed().pipe(
        map(r => {
          if (r && r.event == 'updated') {
            this.snackBar.open('Role updated successfully', 'Close', {duration: 6000});
            this.fetchData();
          }
        }),
        take(1)
      ).subscribe();
    }
  }
  deleteRole(role: Role) {
    if ((<any>role).roleName === 'System Developer') {
      this.snackBar.open('You cannot delete system developer\'s role!', 'Close', {duration: 6000});
    } else {
      const dialogRef = this.dilaog.open(DeleteDialogComponent, {
        width: '300px', height: '150px', data: { message: 'Are you sure you want to delete this role?'},
      });
      dialogRef.afterClosed().pipe(
        map((r) => {
          if (r.event === 'delete') {
            this.porgressBarService.showProgressbar();
            this.repository.RoleRepository.deleteRole((<any>role).id).pipe(
              map((r) => {
                this.fetchData();
                this.snackBar.open('Role deleted succefully', 'OK', {duration: 3000});
              }),
              take(1)
            ).subscribe();
          }
        }),
        take(1)
      ).subscribe();
    }
  }
  showDetails (role: Role) {
    this.dilaog.open(ProfileComponent, {
      width: '500px', height: '600px', data: { model: role },
    });
  }
  handlePaging(paging: PageEvent) {
    this.pagingFilter = paging;
    this.fetchData();
  }
  ngOnDestroy = (): void => this.roleChangeEvent.unsubscribe();
}
