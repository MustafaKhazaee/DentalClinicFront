import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeFormComponent
  ],
  imports: [
    CommonModule, EmployeeRoutingModule, MatGridListModule, MatCardModule, MatProgressBarModule, SharedModule,
    MatFormFieldModule, MatIconModule, MatDividerModule, MatInputModule, MatButtonModule, MatSlideToggleModule,
    MatSelectModule, ReactiveFormsModule, MatDialogModule, MatRadioModule, MatDatepickerModule, CoreModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ]
})
export class EmployeeModule { }
