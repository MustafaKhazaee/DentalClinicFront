import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, take } from 'rxjs';
import { AppTextService } from 'src/app/core/appTextService/app-text.service';
import { ProgressDisplayService } from 'src/app/core/progressDisplay/progress-display.service';
import { RepositoryService } from 'src/app/data/repository/repository.service';
import { PatientFormComponent } from '../../patient/patient-form/patient-form.component';

@Component({
  selector: 'app-visit-form',
  templateUrl: './visit-form.component.html',
  styleUrls: ['./visit-form.component.scss']
})
export class VisitFormComponent implements OnInit {
  constructor (private formBuilder: FormBuilder, private repository: RepositoryService, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any, private matDialogRef: MatDialogRef<PatientFormComponent>,
    private appText: AppTextService, private progressBarService: ProgressDisplayService) {
    this.editing = data.visit;
  }
  Texts = this.appText.getAppTexts();
  visitForm = this.formBuilder.group({
    doctorId: ['', Validators.required],
    patientId: ['', Validators.required],
    room: [],
    preOperationFee: ['0'],
    postOperationFee: ['0'],
    scheduleDate: [],
    doneDate: [],
    operation: ['', Validators.required],
    priorityLevel: ['', Validators.required],
    description: ['']
  });
  editing!: boolean;
  doctors!: any;
  patients!: any;
  operations = [ {name: 'TakeOut', number : 0}, {name: 'Fill', number : 1}, {name: 'Orthodontics', number: 2},
                 {name: 'Cleaning', number : 3}, {name: 'Cover', number: 4} ];
  priorities = [ {name: 'None', number: 0}, {name: 'Low', number: 1}, {name: 'Medium', number: 2},
                 {name: 'High', number: 3}, {name: 'Urgent', number: 4} ];
  ngOnInit(): void {
    this.populateDropdowns();
    if (this.editing) {
      this.visitForm.controls['doctorId'].setValue(this.data.visit.doctorId);
      this.visitForm.controls['patientId'].setValue(this.data.visit.patientId);
      this.visitForm.controls['room'].setValue(this.data.visit.room);
      this.visitForm.controls['preOperationFee'].setValue(this.data.visit.preOperationFee);
      this.visitForm.controls['postOperationFee'].setValue(this.data.visit.postOperationFee);
      this.visitForm.controls['scheduleDate'].setValue(this.data.visit.scheduleDate);
      this.visitForm.controls['doneDate'].setValue(this.data.visit.doneDate);
      this.visitForm.controls['description'].setValue(this.data.visit.description);
      this.visitForm.controls['priorityLevel'].setValue(this.priorities.filter(o => o.name === this.data.visit.priorityLevel)[0].number as number);
      this.visitForm.controls['operation'].setValue(this.operations.filter(o => o.name === this.data.visit.operation)[0].number as number);
    }
    setTimeout(() => this.progressBarService.hideProgressbar());
  }
  compareOperation = (a: any, b: any) : boolean =>
    this.data.visit && a == this.operations.filter(o => o.name === this.data.visit.operation)[0].number;
  comparePriority = ( a: any, b: any) : boolean =>
    this.data.visit && a == this.priorities.filter(o => o.name === this.data.visit.priorityLevel)[0].number;
  submitForm () {
    this.progressBarService.showProgressbar();
    this.repository.VisitRepository.addVisit(this.visitForm.value).pipe(
      map(r => {
        if (r === 201) {
          this.snackBar.open('Visit added succefully', 'OK', {duration: 3000});
          (document.querySelector('#clearVisitForm') as HTMLButtonElement).click();
        }
        else if (r === 409)
          this.snackBar.open('Visit already exists', 'OK', {duration: 3000});
        this.progressBarService.hideProgressbar();
      }),
      take(1)
    ).subscribe();
  }
  submitEdit = () => {
    this.progressBarService.showProgressbar();
    this.repository.VisitRepository.editVisit(this.visitForm.value, this.data.id).pipe(
      map(r => {
        this.matDialogRef.close({event: 'updated'});
      }),
      take(1)
    ).subscribe();
  }
  private populateDropdowns() {
    this.repository.DoctorRepository.getAllDoctors().pipe(
      map(r => this.doctors = r),
      take(1)
    ).subscribe();
    this.repository.PatientRepository.getAllPatients().pipe(
      map(r => this.patients = r),
      take(1)
    ).subscribe();
  }
}
