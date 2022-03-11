import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppUserRoutingModule } from './app-user-routing.module';
import { AppUserFormComponent } from './app-user-form/app-user-form.component';
import { AppUserComponent } from './app-user.component';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreModule } from 'src/app/core/core.module';
@NgModule({
  declarations: [
    AppUserComponent,
    AppUserFormComponent
  ],
  imports: [
    CommonModule, AppUserRoutingModule, MatGridListModule, MatCardModule, MatProgressBarModule, SharedModule,
    MatFormFieldModule, MatIconModule, MatDividerModule, MatInputModule, MatButtonModule, MatSlideToggleModule,
    MatSelectModule, ReactiveFormsModule, MatDialogModule, CoreModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ]
})
export class AppUserModule { }
