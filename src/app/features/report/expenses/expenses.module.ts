import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';
import { MatCardModule } from '@angular/material/card';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    ExpensesComponent
  ],
  imports: [ CommonModule, ExpensesRoutingModule, ChartsModule, MatCardModule, CoreModule ]
})
export class ExpensesModule { }
