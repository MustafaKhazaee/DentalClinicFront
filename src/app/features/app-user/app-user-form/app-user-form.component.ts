import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, take } from 'rxjs';
import { AppTextService } from 'src/app/core/appTextService/app-text.service';
import { ProgressDisplayService } from 'src/app/core/progressDisplay/progress-display.service';
import { RepositoryService } from 'src/app/data/repository/repository.service';
@Component({
  selector: 'app-app-user-form',
  templateUrl: './app-user-form.component.html',
  styleUrls: ['./app-user-form.component.scss']
})
export class AppUserFormComponent implements OnInit {
  hide: boolean = true;
  Texts = this.appText.getAppTexts();
  constructor (private formBuilder: FormBuilder, private repository: RepositoryService, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any, private matDialogRef: MatDialogRef<AppUserFormComponent>,
    private appText: AppTextService, private progressBarService: ProgressDisplayService) {
    this.repository.RoleRepository.getAllRoles().pipe(
      map(r => {
        this.roles = r;
      }),
      take(1)
    ).subscribe();
    this.editing = data.appUser;
  }
  appUserForm = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    userType: ['', Validators.required],
    isLocked: [false],
    roles: ['', Validators.required],
  });
  roles!: Array<any>;
  editing!: boolean;
  r: Array<any> = [];
  myMap: Array<any> = ["Employee","Doctor"];
  ngOnInit(): void {
    if (this.data.appUser) {
      this.appUserForm.controls['userName'].patchValue(this.data.appUser.userName);
      this.appUserForm.controls['password'].patchValue(this.data.appUser.password);
      this.appUserForm.controls['isLocked'].patchValue(this.data.appUser.isLocked);
      this.appUserForm.controls['userType'].patchValue(this.myMap.indexOf(this.data.appUser.userType));
      this.appUserForm.controls['roles'].patchValue(this.r);
      for (let i = 0; i < this.data.appUser.appUserRoles.length; i++)
        this.r.push(this.data.appUser.appUserRoles[i].role.id);
    }
    setTimeout(() => this.progressBarService.hideProgressbar());
  }
  compareRoles = (a: any, b: any) : boolean => this.editing && this.r.indexOf(a) != -1;
  compareUserTypes = (a: any, b: any) : boolean => this.editing && this.myMap[a] == this.data.appUser.userType;
  passwordError = (errorType: string) : boolean =>
    (<any>this.appUserForm.get('password')?.errors) ? (<any>this.appUserForm.get('password')?.errors)[errorType] : false;
  submitForm () {
    this.progressBarService.showProgressbar();
    this.repository.AppUserRepository.addUser(this.appUserForm.value).pipe(
      map(r => {
        if (r === 201) {
          this.snackBar.open('User added succefully', 'OK', {duration: 3000});
          (document.querySelector('#clearAppUserForm') as HTMLButtonElement).click();
          this.appUserForm.controls['isLocked'].patchValue(false);
        }
        else if (r === 409)
          this.snackBar.open('User already exists', 'OK', {duration: 3000});
        this.progressBarService.hideProgressbar();
      }),
      take(1)
    ).subscribe();
  }
  submitEdit = () => {
    this.progressBarService.showProgressbar();
    this.repository.AppUserRepository.editUser(this.appUserForm.value, this.data.id).pipe(
      map(r => {
        this.matDialogRef.close({event: 'updated'});
      }),
      take(1)
    ).subscribe();
  }
}
