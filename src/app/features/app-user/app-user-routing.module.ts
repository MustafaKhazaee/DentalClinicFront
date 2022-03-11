import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppUserFormComponent } from './app-user-form/app-user-form.component';
import { AppUserComponent } from './app-user.component';
const routes: Routes = [
  { path: '', component: AppUserComponent },
  { path: 'AddAppUser', component: AppUserFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppUserRoutingModule { }
