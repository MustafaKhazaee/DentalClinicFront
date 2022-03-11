import { AppUserRole } from "./app-user-role";
import { RolePermission } from "./role-permission";

export interface Role {
  Id: string;
  RoleName: string;
  AppUserRoles: Array<AppUserRole>;
  RolePermissions: Array<RolePermission>;
}
