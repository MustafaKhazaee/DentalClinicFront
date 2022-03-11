import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, take } from 'rxjs';
import { AppTextService } from 'src/app/core/appTextService/app-text.service';
import { ProgressDisplayService } from 'src/app/core/progressDisplay/progress-display.service';
import { RepositoryService } from 'src/app/data/repository/repository.service';
@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.scss']
})
export class DoctorFormComponent implements OnInit {
  constructor (private formBuilder: FormBuilder, private repository: RepositoryService, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any, private matDialogRef: MatDialogRef<DoctorFormComponent>,
    private appText: AppTextService, private progressBarService: ProgressDisplayService) {
    this.editing = data.doctor;
  }
  Texts = this.appText.getAppTexts();
  doctorForm = this.formBuilder.group({
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
      this.doctorForm.controls['firstName'].setValue(this.data.doctor.firstName);
      this.doctorForm.controls['lastName'].setValue(this.data.doctor.lastName);
      this.doctorForm.controls['gender'].setValue(this.data.doctor.gender === 'male' ? "0" : "1");
      this.doctorForm.controls['dateOfBirth'].setValue(this.data.doctor.dateOfBirth);
      this.doctorForm.controls['mobile'].setValue(this.data.doctor.mobile);
      this.doctorForm.controls['email'].setValue(this.data.doctor.email);
      this.doctorForm.controls['address'].setValue(this.data.doctor.address);
      this.doctorForm.controls['appUserId'].setValue(this.data.doctor.appUserId);
    }
    setTimeout(() => this.progressBarService.hideProgressbar());
  }
  getUsers = () => this.repository.AppUserRepository.getUnassignedUsers("Doctors").pipe(
    map(r => {
      this.appUsers = r;
    }),
    take(1)
  ).subscribe();
  submitForm () {
    this.progressBarService.showProgressbar();
    this.repository.DoctorRepository.addDoctor(this.doctorForm.value).pipe(
      map(r => {
        if (r === 201) {
          this.snackBar.open('Doctor added succefully', 'OK', {duration: 3000});
          (document.querySelector('#clearDoctorForm') as HTMLButtonElement).click();
          this.doctorForm.controls['gender'].setValue("0");
          this.getUsers();
        }
        else if (r === 409)
          this.snackBar.open('Doctor already exists', 'OK', {duration: 3000});
        this.progressBarService.hideProgressbar();
      }),
      take(1)
    ).subscribe();
  }
  submitEdit = () => {
    this.progressBarService.showProgressbar();
    this.repository.DoctorRepository.editDoctor(this.doctorForm.value, this.data.id).pipe(
      map(r => {
        this.matDialogRef.close({event: 'updated'});
      }),
      take(1)
    ).subscribe();
  }
}
