import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Colors, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { debounceTime, map, take } from 'rxjs';
import { AppTextService } from 'src/app/core/appTextService/app-text.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { ProgressDisplayService } from 'src/app/core/progressDisplay/progress-display.service';
import { RepositoryService } from 'src/app/data/repository/repository.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private appText: AppTextService, private progressbarService: ProgressDisplayService,
    private repository: RepositoryService, private router: Router, private breakPointObserver: BreakpointObserver) {
    monkeyPatchChartJsLegend();
    monkeyPatchChartJsTooltip();
  }
  visitForm = this.formBuilder.group({
    startDate: [''],
    endDate: ['']
  });
  getRandomColor = () : string => `#${Math.random().toString(16).slice(-6)}`;

  Texts = this.appText.getAppTexts();
  renderChart : boolean = false;
  ngOnInit(): void {
    this.registerListeners();
    this.fetchData();
  }
  private fetchData () {
    this.progressbarService.showProgressbar();
    this.repository.ReportRepository.getVisitCountRange(this.startdateSearchKey, this.enddateSearchKey).pipe(
      map(r => {
        this.chartData = [{
          data: r.map((a:any) => a.sum),
          backgroundColor: r.map((a: any) => this.getRandomColor())
        }];
        this.charLabels = r.map((a:any) => a.operation);
        this.renderChart = true;
        setTimeout(() => this.progressbarService.hideProgressbar());
      }),
      take(1),
    ).subscribe();
  }
  chartsColor : Array<string> = [];
  chartOptions: any = {
    responsive: true, aspectRatio: 1,
    animation: { animateRotate: true, duration: 4000, easing: 'easeOutQuart' }
  }
  charLabels!: string[];
  chartData!: any;
  chartType: ChartType = 'bar';
  // chartLegend = true;
  chartPlugins = [];
  startDate = this.visitForm.controls['startDate'];
  endDate = this.visitForm.controls['endDate'];
  startDateChangeEvent!: any; endDateChangeEvent!: any;
  startdateSearchKey!: string; enddateSearchKey!: any;
  private registerListeners() {
    this.startDateChangeEvent = this.startDate.valueChanges.pipe(
      debounceTime(1000),
      map((r: Date) => {
        this.startdateSearchKey = `${r.getMonth() + 1}/${r.getDate()}/${r.getFullYear()}`;
        this.fetchData();
      })
    ).subscribe();
    this.endDateChangeEvent = this.endDate.valueChanges.pipe(
      debounceTime(1000),
      map((r: Date) => {
        this.enddateSearchKey = `${r.getMonth() + 1}/${r.getDate()}/${r.getFullYear()}`;
        this.fetchData();
      })
    ).subscribe();
  }
  toExcel () {
    this.progressbarService.showProgressbar();
    this.repository.ReportRepository.getVisitCountRange(this.startdateSearchKey, this.enddateSearchKey).pipe(
      map(r => {
        let content = 'Operation,Sum\n';
        r.forEach((a:any) => content += `${a.operation},${a.sum}\n`);
        const file = new Blob([this.s2ab(atob(content))], {type: ''});
        const a = document.createElement('a');
        const url = URL.createObjectURL(file);
        a.href = url;
        a.download = "file";
        document.body.appendChild(a);
        a.click();
        this.charLabels = r.map((a:any) => a.operation);
        setTimeout(() => this.progressbarService.hideProgressbar());
      }),
      take(1),
    ).subscribe();
  }
  s2ab(s: string) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i-=-1) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }
}
// hoverBackgroundColor: ['grey', 'grey', 'grey'],
// pointBackgroundColor: ['blue', 'red', 'green']
// borderColor: ['green', 'blue', 'red'],
// borderWidth: [2, 2, 2],
