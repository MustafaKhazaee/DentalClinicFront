import { AuditableEntity } from "./common/auditable-entity";
export interface Expense extends AuditableEntity {
  Id: string;
  ItemName: string;
  PricePerItem: number;
  Count: number;
  Date: Date;
  Description: string;
}
