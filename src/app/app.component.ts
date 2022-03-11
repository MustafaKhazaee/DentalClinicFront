import { Component } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { UpdateService } from '../app/core/updateService/update.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DentalClinic';
  loading: boolean;
  spinnerColor = "primary";
  spinnerMode = "indeterminate" as ProgressSpinnerMode;
  constructor(private router: Router, private updateService: UpdateService) {
    this.loading = false;
    router.events.subscribe(event => {
        if (event instanceof NavigationStart)
          this.loading = true;
        else if (event instanceof NavigationEnd)
          this.loading = false;
    });
  }
}
