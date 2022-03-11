import { Injectable } from '@angular/core';
import { AppUserRepositoryService } from './app-user-repository.service';
import { DoctorRepositoryService } from './doctor-repository.service';
import { EmployeeRepositoryService } from './employee-repository.service';
import { ExpenseRepositoryService } from './expense-repository.service';
import { PatientRepositoryService } from './patient-repository.service';
import { ReportRepositoryService } from './report-repository.service';
import { RoleRepositoryService } from './role-repository.service';
import { VisitRepositoryService } from './visit-repository.service';
@Injectable({ providedIn: 'root' })
export class RepositoryService {
  AppUserRepository; DoctorRepository; EmployeeRepository; ExpenseRepository;
  PatientRepository; RoleRepository; VisitRepository; ReportRepository;
  constructor (appUserRepository: AppUserRepositoryService, doctorRepository: DoctorRepositoryService,
               employeeRepository: EmployeeRepositoryService, expenseRepository: ExpenseRepositoryService,
               patientRepository: PatientRepositoryService, roleRepository: RoleRepositoryService,
               visitRepository: VisitRepositoryService, reportRepository: ReportRepositoryService) {
    this.AppUserRepository = appUserRepository; this.DoctorRepository = doctorRepository;
    this.EmployeeRepository = employeeRepository; this.ExpenseRepository = expenseRepository;
    this.PatientRepository = patientRepository; this.RoleRepository = roleRepository;
    this.VisitRepository = visitRepository; this.ReportRepository = reportRepository;
  }
}
