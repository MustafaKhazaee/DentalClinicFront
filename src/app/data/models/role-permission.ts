import { Permission } from "./permission";
import { Role } from "./role";

export interface RolePermission {
  RoleId: string;
  Role: Role;
  PermissionId: string;
  Permission: Permission;
}
