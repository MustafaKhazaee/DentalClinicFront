import { Component, OnInit } from '@angular/core';
import { AppTextService } from 'src/app/core/appTextService/app-text.service';
import { ProgressDisplayService } from 'src/app/core/progressDisplay/progress-display.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  constructor(private appText: AppTextService, private progressBarService: ProgressDisplayService) { }
  Texts = this.appText.getAppTexts();
  ngOnInit(): void {
    this.progressBarService.hideProgressbar();
  }
}
