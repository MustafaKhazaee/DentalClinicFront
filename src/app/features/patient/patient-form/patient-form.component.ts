import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, take } from 'rxjs';
import { AppTextService } from 'src/app/core/appTextService/app-text.service';
import { ProgressDisplayService } from 'src/app/core/progressDisplay/progress-display.service';
import { RepositoryService } from 'src/app/data/repository/repository.service';
@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {
  constructor (private formBuilder: FormBuilder, private repository: RepositoryService, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any, private matDialogRef: MatDialogRef<PatientFormComponent>,
    private appText: AppTextService, private progressBarService: ProgressDisplayService) {
    this.editing = data.patient;
  }
  Texts = this.appText.getAppTexts();
  patientForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: [''],
    gender: ['0'],
    age: ['', Validators.required],
    mobile: []
  });
  editing!: boolean;
  ngOnInit(): void {
    if (this.editing) {
      this.patientForm.controls['firstName'].setValue(this.data.patient.firstName);
      this.patientForm.controls['lastName'].setValue(this.data.patient.lastName);
      this.patientForm.controls['gender'].setValue(this.data.patient.gender === 'male' ? "0" : "1");
      this.patientForm.controls['age'].setValue(this.data.patient.age);
      this.patientForm.controls['mobile'].setValue(this.data.patient.mobile);
    }
    setTimeout(() => this.progressBarService.hideProgressbar());
  }
  submitForm () {
    this.progressBarService.showProgressbar();
    this.repository.PatientRepository.addPatient(this.patientForm.value).pipe(
      map(r => {
        if (r === 201) {
          this.snackBar.open('Patient added succefully', 'OK', {duration: 3000});
          (document.querySelector('#clearPatientForm') as HTMLButtonElement).click();
          this.patientForm.controls['gender'].setValue("0");
        }
        else if (r === 409)
          this.snackBar.open('Patient already exists', 'OK', {duration: 3000});
        this.progressBarService.hideProgressbar();
      }),
      take(1)
    ).subscribe();
  }
  submitEdit = () => {
    this.progressBarService.showProgressbar();
    this.repository.PatientRepository.editPatient(this.patientForm.value, this.data.id).pipe(
      map(r => {
        this.matDialogRef.close({event: 'updated'});
      }),
      take(1)
    ).subscribe();
  }
}
