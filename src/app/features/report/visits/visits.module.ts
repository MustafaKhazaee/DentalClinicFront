import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitsRoutingModule } from './visits-routing.module';
import { VisitsComponent } from './visits.component';
import { CoreModule } from 'src/app/core/core.module';
import { MatCardModule } from '@angular/material/card';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    VisitsComponent
  ],
  imports: [ CommonModule, VisitsRoutingModule, ChartsModule, MatCardModule, CoreModule, ReactiveFormsModule,
    MatDatepickerModule, MatFormFieldModule, MatInputModule, MatIconModule]
})
export class VisitsModule { }
