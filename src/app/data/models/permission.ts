import { Role } from "./role";
import { RolePermission } from "./role-permission";
export interface Permission {
  Id: string;
  Code: string;
  RolePermissions: Array<RolePermission>;
}
