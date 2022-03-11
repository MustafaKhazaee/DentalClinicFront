import { AuditableEntity } from "./common/auditable-entity";
import { Visit } from "./visit";
export interface Patient extends AuditableEntity {
  Id: string;
  FirstName: string;
  LastName: string;
  Gender: boolean;
  Age: number;
  Mobile: string;
  Visits: Array<Visit>;
}
