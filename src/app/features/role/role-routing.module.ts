import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleFormComponent } from './role-form/role-form.component';
import { RoleComponent } from './role.component';

const routes: Routes = [
  { path: '', component: RoleComponent },
  { path: 'AddRole', component: RoleFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
