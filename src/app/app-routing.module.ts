import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationGuard } from './core/routeGuards/navigation-guard.service';
import { RoleGuard } from './core/routeGuards/role-guard.service';
import { ErrorPageComponent } from './features/error-page/error-page.component';
import { NavigationComponent } from './navigation/navigation.component';
const routes: Routes = [
  { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
  { path: 'Login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  { path: 'Dashboard', component: NavigationComponent, canLoad : [NavigationGuard],
    children: [
      { path: '', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'AppUser', loadChildren: () => import('./features/app-user/app-user.module').then(m => m.AppUserModule), canLoad: [RoleGuard], canActivateChild: [RoleGuard] },
      { path: 'Role', loadChildren: () => import('./features/role/role.module').then(m => m.RoleModule), canLoad: [RoleGuard], canActivateChild: [RoleGuard] },
      { path: 'Doctor', loadChildren: () => import('./features/doctor/doctor.module').then(m => m.DoctorModule), canLoad: [RoleGuard], canActivateChild: [RoleGuard] },
      { path: 'Patient', loadChildren: () => import('./features/patient/patient.module').then(m => m.PatientModule), canLoad: [RoleGuard], canActivateChild: [RoleGuard] },
      { path: 'Visit', loadChildren: () => import('./features/visit/visit.module').then(m => m.VisitModule), canLoad: [RoleGuard], canActivateChild: [RoleGuard] },
      { path: 'Expense', loadChildren: () => import('./features/expense/expense.module').then(m => m.ExpenseModule), canLoad: [RoleGuard], canActivateChild: [RoleGuard] },
      { path: 'Employee', loadChildren: () => import('./features/employee/employee.module').then(m => m.EmployeeModule), canLoad: [RoleGuard], canActivateChild: [RoleGuard] },
      { path: 'Report/Expenses', loadChildren: () => import('./features/report/expenses/expenses.module').then(m => m.ExpensesModule), canLoad: [RoleGuard], canActivateChild: [RoleGuard] },
      { path: 'Report/Visits', loadChildren: () => import('./features/report/visits/visits.module').then(m => m.VisitsModule), canLoad: [RoleGuard], canActivateChild: [RoleGuard] },
    ]
  },
  { path: "**", component: ErrorPageComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
