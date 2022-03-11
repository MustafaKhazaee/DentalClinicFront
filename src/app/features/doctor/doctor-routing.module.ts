import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/core/routeGuards/role-guard.service';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';
import { DoctorComponent } from './doctor.component';

const routes: Routes = [
  { path: '', component: DoctorComponent },
  { path: 'AddDoctor', component: DoctorFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
