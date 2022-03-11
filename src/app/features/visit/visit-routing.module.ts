import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitBoardComponent } from './visit-board/visit-board.component';
import { VisitFormComponent } from './visit-form/visit-form.component';
import { VisitComponent } from './visit.component';

const routes: Routes = [
  { path: '', component: VisitComponent },
  { path: 'AddVisit', component: VisitFormComponent },
  { path: 'LiveVisit', component: VisitBoardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitRoutingModule { }
