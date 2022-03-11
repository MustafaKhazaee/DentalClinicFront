import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TableComponent } from './components/table/table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CapitalizeFirstLetterPipe } from './pipes/capitalize-first-letter.pipe';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { CoreModule } from '../core/core.module';
@NgModule({
  declarations: [
    TableComponent, CapitalizeFirstLetterPipe, DeleteDialogComponent, ProfileComponent
  ],
  imports: [
    CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatButtonModule,
    MatCardModule, MatDialogModule, MatDividerModule, CoreModule
  ],
  exports: [ TableComponent ],
})
export class SharedModule { }
