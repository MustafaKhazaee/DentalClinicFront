import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  constructor (@Inject(MAT_DIALOG_DATA) private data: any, private matDialogRef: MatDialogRef<DeleteDialogComponent>) { }
  message: string = this.data.message;
  ngOnInit(): void { }
  delete = () => this.matDialogRef.close({event: 'delete'});
  close = () => this.matDialogRef.close({event: 'close'});
}
