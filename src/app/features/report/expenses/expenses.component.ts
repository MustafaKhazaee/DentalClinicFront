import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Colors, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { map, take } from 'rxjs';
import { AppTextService } from 'src/app/core/appTextService/app-text.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { ProgressDisplayService } from 'src/app/core/progressDisplay/progress-display.service';
import { RepositoryService } from 'src/app/data/repository/repository.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  constructor(private authService: AuthenticationService, private appText: AppTextService, private progressbarService: ProgressDisplayService,
    private repository: RepositoryService, private router: Router, private breakPointObserver: BreakpointObserver) {
    monkeyPatchChartJsLegend();
    monkeyPatchChartJsTooltip();
  }
  getRandomColor = () : string => `#${Math.random().toString(16).slice(-6)}`;

  Texts = this.appText.getAppTexts();
  renderChart : boolean = false;
  ngOnInit(): void {
    this.progressbarService.showProgressbar();
    if (this.authService.getCurrentUser().isLoggedIn)
    this.repository.ReportRepository.getCounts().pipe(
      map(r => {
        this.chartData = [{
          data: [ r.users, r.roles, r.doctors, r.patients, r.visits, r.employees, r.expenses ],
          label: ['Users', 'Roles', 'Doctors', 'Patients', 'Visits', 'Employee', 'Expenses'],
          backgroundColor: [this.getRandomColor(),this.getRandomColor(),this.getRandomColor(),this.getRandomColor()
            ,this.getRandomColor(),this.getRandomColor(),this.getRandomColor()],
        }];
        this.renderChart = true;
        setTimeout(() => this.progressbarService.hideProgressbar());
      }),
      take(1),
    ).subscribe();
  }
  chartsColor : Array<string> = [];
  chartOptions: ChartOptions = {
    responsive: true, aspectRatio: 1,
    animation: { animateRotate: true, duration: 4000, easing: 'easeOutQuart' }
  }
  charLabels: string[] = ['Users', 'Roles', 'Doctors', 'Patients', 'Visits', 'Employee', 'Expenses'];
  chartData!: any;
  chartType: ChartType = 'bar';
  chartLegend = false;
  chartPlugins = [];
}
// hoverBackgroundColor: ['grey', 'grey', 'grey'],
// pointBackgroundColor: ['blue', 'red', 'green']
// borderColor: ['green', 'blue', 'red'],
// borderWidth: [2, 2, 2],
