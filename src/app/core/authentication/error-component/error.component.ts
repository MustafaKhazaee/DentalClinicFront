import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  constructor (@Inject(MAT_DIALOG_DATA) private data: any, private matDialogRef: MatDialogRef<ErrorComponent>) { }
  message = this.data["message"];
  ngOnInit(): void {
  }
  close = () => this.matDialogRef.close();
}
