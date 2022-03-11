import { AppUser } from "./app-user";
import { AuditableEntity } from "./common/auditable-entity";
export interface Employee extends AuditableEntity {
  Id: string;
  FirstName: string;
  LastName: string;
  Gender: boolean;
  DateOfBirth: Date;
  Mobile: string;
  Email: string;
  Address: string;
  AppUserId: string;
  AppUser: AppUser;
}
