import { AppUser } from "./app-user";
import { Role } from "./role";

export interface AppUserRole {
  AppUserId: string;
  AppUser: AppUser;
  RoleId: string;
  Role: Role;
}
