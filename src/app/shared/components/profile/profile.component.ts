import { KeyValue } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppTextService } from 'src/app/core/appTextService/app-text.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private matDialogRef: MatDialogRef<ProfileComponent>,
  private appText: AppTextService) { }
  Texts = this.appText.getAppTexts();
  genericObject = this.data.model;
  ngOnInit(): void {
  }
  close = () => this.matDialogRef.close({event: 'close'});
  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>) => 0;
}
