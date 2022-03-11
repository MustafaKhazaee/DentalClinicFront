import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, take } from 'rxjs';
import { AppTextService } from 'src/app/core/appTextService/app-text.service';
import { ProgressDisplayService } from 'src/app/core/progressDisplay/progress-display.service';
import { RepositoryService } from 'src/app/data/repository/repository.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  constructor (private formBuilder: FormBuilder, private repository: RepositoryService, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any, private matDialogRef: MatDialogRef<EmployeeFormComponent>,
    private appText: AppTextService, private progressBarService: ProgressDisplayService) {
    this.editing = data.employee;
  }
  Texts = this.appText.getAppTexts();
  employeeForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['0', Validators.required],
    dateOfBirth: [],
    mobile: [],
    email: [],
    address: [],
    appUserId: [],
  });
  editing!: boolean;
  appUsers!: any;
  ngOnInit(): void {
    this.getUsers();
    if (this.editing) {
      this.employeeForm.controls['firstName'].setValue(this.data.employee.firstName);
      this.employeeForm.controls['lastName'].setValue(this.data.employee.lastName);
      this.employeeForm.controls['gender'].setValue(this.data.employee.gender === 'male' ? "0" : "1");
      this.employeeForm.controls['dateOfBirth'].setValue(this.data.employee.dateOfBirth);
      this.employeeForm.controls['mobile'].setValue(this.data.employee.mobile);
      this.employeeForm.controls['email'].setValue(this.data.employee.email);
      this.employeeForm.controls['address'].setValue(this.data.employee.address);
      this.employeeForm.controls['appUserId'].setValue(this.data.employee.appUserId);
    }
    setTimeout(() => this.progressBarService.hideProgressbar());
  }
  getUsers = () => this.repository.AppUserRepository.getUnassignedUsers("Employees").pipe(
    map(r => this.appUsers = r),
    take(1)
  ).subscribe();
  submitForm () {
    this.progressBarService.showProgressbar();
    this.repository.EmployeeRepository.addEmployee(this.employeeForm.value).pipe(
      map(r => {
        if (r === 201) {
          this.snackBar.open('Employee added succefully', 'OK', {duration: 3000});
          (document.querySelector('#clearEmployeeForm') as HTMLButtonElement).click();
          this.employeeForm.controls['gender'].setValue("0");
          this.getUsers();
        }
        else if (r === 409)
          this.snackBar.open('Employee already exists', 'OK', {duration: 3000});
        this.progressBarService.hideProgressbar();
      }),
      take(1)
    ).subscribe();
  }
  submitEdit = () => {
    this.progressBarService.showProgressbar();
    this.repository.EmployeeRepository.editEmployee(this.employeeForm.value, this.data.id).pipe(
      map(r => {
        this.matDialogRef.close({event: 'updated'});
      }),
      take(1)
    ).subscribe();
  }
}
