import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { concatMapTo, map, take } from 'rxjs';
import { AppTextService } from 'src/app/core/appTextService/app-text.service';
import { ProgressDisplayService } from 'src/app/core/progressDisplay/progress-display.service';
import { RepositoryService } from 'src/app/data/repository/repository.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  Texts = this.appText.getAppTexts();
  constructor (private formBuilder: FormBuilder, private repository: RepositoryService, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any, private matDialogRef: MatDialogRef<RoleFormComponent>,
    private appText: AppTextService, private progressBarService: ProgressDisplayService) {
      this.editing = data.role;
     }
  roleForm = this.formBuilder.group({
    rolename: ['', Validators.required],
    permissions : this.formBuilder.group({
      "00": [false], "01": [false], "02": [false], "03": [false],
      "10": [false], "11": [false], "12": [false], "13": [false],
      "20": [false], "21": [false], "22": [false], "23": [false],
      "30": [false], "31": [false], "32": [false], "33": [false],
      "40": [false], "41": [false], "42": [false], "43": [false],
      "50": [false], "51": [false], "52": [false], "53": [false],
      "60": [false], "61": [false], "62": [false], "63": [false],  "64": [false],
      "70": [false]
    })
  });
  editing!: boolean;
  ngOnInit(): void {
    if (this.editing) {
      for (let i = 0; i < this.data.role.rolePermissions.length; i++) {
        let p = this.data.role.rolePermissions[i].permission.code;
        this.roleForm.controls['permissions'].get(p)?.patchValue(true);
      }
      this.roleForm.controls['rolename'].patchValue(this.data.role.roleName);
    }
    setTimeout(() => this.progressBarService.hideProgressbar());
  }
  toggleAll ($event: any) {
    console.log($event);
    for (let i = 0; i < 7; i++)
      for (let j = 0; j < 4; j++)
        this.roleForm.controls['permissions'].get(`${i}${j}`)?.patchValue($event.checked);
    this.roleForm.controls['permissions'].get('64')?.patchValue($event.checked);
    this.roleForm.controls['permissions'].get('70')?.patchValue($event.checked);
  }
  submitForm () {
    this.progressBarService.showProgressbar();
    this.repository.RoleRepository.addRole(this.roleForm.value).pipe(
      map(r => {
        if (r === 201) {
          this.snackBar.open('Role added succefully', 'OK', {duration: 3000});
          (document.querySelector('#clearRoleForm') as HTMLButtonElement).click();
        }
        else if (r === 409)
          this.snackBar.open('Role already exists', 'OK', {duration: 3000});
        this.progressBarService.hideProgressbar();
      }),
      take(1)
    ).subscribe();
  }
  submitEdit = () => {
    this.progressBarService.showProgressbar();
    this.repository.RoleRepository.editRole(this.roleForm.value, this.data.id).pipe(
      map(r => {
        this.matDialogRef.close({event: 'updated'});
      }),
      take(1)
    ).subscribe();
  }
}
