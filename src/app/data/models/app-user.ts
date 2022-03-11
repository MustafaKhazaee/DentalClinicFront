import { AppUserRole } from "./app-user-role";
import { AuditableEntity } from "./common/auditable-entity";
export interface AppUser extends AuditableEntity {
  Id: string;
  UserName: string;
  Password: string;
  Salt: string;
  isLocked: boolean;
  UserType: string;
  AppUserRoles: Array<AppUserRole>;
}
