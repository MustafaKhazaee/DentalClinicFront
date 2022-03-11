import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { CoreModule } from '../core/core.module';
@NgModule({
  declarations: [ LoginComponent ],
  imports: [ MatCardModule, MatDividerModule, MatButtonModule, MatIconModule, MatFormFieldModule,
    MatInputModule, MatProgressBarModule, ReactiveFormsModule, CommonModule, LoginRoutingModule, CoreModule
  ]
})
export class LoginModule { }
