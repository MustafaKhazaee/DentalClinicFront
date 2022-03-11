import { AppUser } from "./app-user";
import { Visit } from "./visit";
export interface Doctor {
  Id: string;
  FirstName: string;
  LastName: string;
  Gender: boolean;  // 0 is male
  DateOfBirth: Date;
  Mobile: string;
  Email: string;
  Address: string;
  Photo: string;
  Visits: Array<Visit>;
  AppUserId: string;
  AppUser: AppUser;
}
