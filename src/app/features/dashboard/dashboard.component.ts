import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { map, Subscription, take } from 'rxjs';
import { AppTextService } from 'src/app/core/appTextService/app-text.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { ProgressDisplayService } from 'src/app/core/progressDisplay/progress-display.service';
import { RepositoryService } from 'src/app/data/repository/repository.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthenticationService, private appText: AppTextService, private progressbarService: ProgressDisplayService,
    private repository: RepositoryService, private router: Router, private breakPointObserver: BreakpointObserver) {
    monkeyPatchChartJsLegend();
    monkeyPatchChartJsTooltip();
  }
  ngOnDestroy(): void {
    this.bpo.unsubscribe();
  }
  isDesktop: boolean = true;
  renderChart : boolean = false;
  bpo!: Subscription;
  ngOnInit(): void {
    this.progressbarService.showProgressbar();
    this.bpo = this.breakPointObserver.observe([
      Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape
    ]).subscribe(r => {
      if (r.matches) {
        if (r.breakpoints['(max-width: 599.98px) and (orientation: portrait)']) {
          this.isDesktop = false;
        }
        else if (r.breakpoints['(max-width: 959.98px) and (orientation: landscape)']) {
          this.isDesktop = true;
        }
      }
    });
    if (this.authService.getCurrentUser().isLoggedIn)
    this.repository.ReportRepository.getCounts().pipe(
      map(r => {
        this.dashboardItems[0].number = r.users;
        this.dashboardItems[1].number = r.roles;
        this.dashboardItems[2].number = r.doctors;
        this.dashboardItems[3].number = r.patients;
        this.dashboardItems[4].number = r.visits;
        this.dashboardItems[5].number = r.employees;
        this.dashboardItems[6].number = r.expenses;
        this.pieChartData = [
          this.dashboardItems[0].number,
          this.dashboardItems[1].number,
          this.dashboardItems[2].number,
          this.dashboardItems[3].number,
          this.dashboardItems[4].number,
          this.dashboardItems[5].number,
          this.dashboardItems[6].number,
        ];
        this.renderChart = true;
        setTimeout(() => this.progressbarService.hideProgressbar());
      }),
      take(1),
    ).subscribe();
  }
  navigate = (url: string) => this.router.navigate([url]);
  dashboardItems = [
    {class: "fa fa-user", number: 10, link: '/Dashboard/AppUser'},
    {class: "fa fa-lock", number: 10, link: '/Dashboard/Role'},
    {class: "fa fa-user-md", number: 10, link: '/Dashboard/Doctor'},
    {class: "fa fa-medkit", number: 10, link: '/Dashboard/Patient'},
    {class: "fa fa-stethoscope", number: 10, link: '/Dashboard/Visit'},
    {class: "fa fa-users", number: 10, link: '/Dashboard/Employee'},
    {class: "fa fa-money", number: 10, link: '/Dashboard/Expense'},
    {class: "fa fa-pie-chart", number: 4, link: '/Dashboard/Report'},
  ]
  Texts = this.appText.getAppTexts();
  pieChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 1.1,
    cutoutPercentage: 5,
    animation: {
      animateRotate: true,
      duration: 3000,
      easing: 'easeOutBounce',
    }
  }
  pieCharLabels: string[] = ['Users', 'Roles', 'Doctors', 'Patients', 'Visits', 'Employee', 'Expenses'];
  pieChartData!: SingleDataSet;
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];
}
