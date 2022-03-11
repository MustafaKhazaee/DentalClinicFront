import { AuditableEntity } from "./common/auditable-entity";
import { Doctor } from "./doctor";
import { Patient } from "./patient";
export interface Visit extends AuditableEntity {
  Id: string;
  DoctorId: string;
  Doctor: Doctor;
  PatientId: string;
  Patient: Patient;
  Room: string;
  PreOperationFee: number;
  PostOperationFee: number;
  ScheduleDate: Date;
  DoneDate: Date;
  Operation: string;
  Description: string;
  PriorityLevel: string;
}
