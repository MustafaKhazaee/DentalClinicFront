export interface AuditableEntity {
  CreatedBy: string;
  CreatedDate: Date;
  LastModifiedBy: string;
  LastModifiedDate: Date;
  IsDeleted: boolean;
}
