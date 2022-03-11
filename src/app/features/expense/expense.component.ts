import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromEvent, debounceTime, map, take } from 'rxjs';
import { AppTextService } from 'src/app/core/appTextService/app-text.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { ProgressDisplayService } from 'src/app/core/progressDisplay/progress-display.service';
import { PagedResult } from 'src/app/data/models/common/paged-result';
import { Expense } from 'src/app/data/models/expense';
import { RepositoryService } from 'src/app/data/repository/repository.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private overlay: Overlay , private repository: RepositoryService,
    private dilaog: MatDialog, private snackBar: MatSnackBar, private appText: AppTextService,
    private authenticationService: AuthenticationService, private progressBarService: ProgressDisplayService) {
    this.canEdit = this.authenticationService.checkPermission("/EditExpense");
    this.canDelete = this.authenticationService.checkPermission("/DeleteExpense");
  }
  canEdit!: boolean;
  canDelete!: boolean;
  table!: PagedResult<Expense>;
  Texts = this.appText.getAppTexts();
  dataLoaded: boolean = false;
  itemNameChangeEvent!: any; startDateChangeEvent!: any; endDateChangeEvent!: any;
  itemnameSearchKey!: string; startdateSearchKey!: string; enddateSearchKey!: any;
  excludedColumns: Array<string> = ['id', 'createdBy', 'createdDate', 'lastModifiedBy', 'lastModifiedDate', 'isDeleted'];
  pagingFilter!: PageEvent;
  expenseForm = this.formBuilder.group({
    startDate: [''],
    endDate: ['']
  });
  startDate = this.expenseForm.controls['startDate'];
  endDate = this.expenseForm.controls['endDate'];
  @ViewChild('itemname', { static: true }) itemname: any;
  ngOnInit(): void {
    this.progressBarService.showProgressbar();
    this.registerListeners();
    this.fetchData();
  }
  fetchData = () => this.repository.ExpenseRepository.getExpenses(
      this.itemnameSearchKey, this.startdateSearchKey, this.enddateSearchKey, this.pagingFilter).pipe(
    map((r) => {
      this.table = r as PagedResult<Expense>;
      this.dataLoaded = true;
      this.progressBarService.hideProgressbar();
    }),
    take(1)
  ).subscribe();
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
    this.itemNameChangeEvent = fromEvent(this.itemname.nativeElement, 'keyup').pipe(
      debounceTime(1000),
      map((r) => {
        this.itemnameSearchKey = ((r as Event).target as any)['value'].trim();
        this.fetchData();
      })
    ).subscribe();
  }
  editExpense (expense: Expense) {
    const scrollStrategy = this.overlay.scrollStrategies.reposition;
    const dialogRef = this.dilaog.open(ExpenseFormComponent, {
      width: '320px', data: { expense: expense, id: (<any>expense).id, scrollStrategy: scrollStrategy },
    });
    dialogRef.afterClosed().pipe(
      map(r => {
        if (r && r.event == 'updated') {
          this.fetchData();
          this.snackBar.open('Expense updated succefully', 'OK', {duration: 3000});
        }
      }),
      take(1)
    ).subscribe();
  }
  deleteExpense(expense: Expense) {
    const dialogRef = this.dilaog.open(DeleteDialogComponent, {
      width: '300px', height: '150px', data: { message: 'Are you sure you want to delete this expense?'},
    });
    dialogRef.afterClosed().pipe(
      map((r) => {
        if (r && r.event === 'delete') {
          this.progressBarService.showProgressbar();
          this.repository.ExpenseRepository.deleteExpense((<any>expense).id).pipe(
            map((r) => {
              this.fetchData();
              this.snackBar.open('Expense deleted succefully', 'OK', {duration: 3000});
            }),
            take(1)
          ).subscribe();
        }
      }),
      take(1)
    ).subscribe();
  }
  showDetails (expense: Expense) {
    this.dilaog.open(ProfileComponent, {
      width: '500px', height: '600px', data: { model: expense },
    });
  }
  handlePaging(paging: PageEvent) {
    this.pagingFilter = paging;
    this.fetchData();
  }
  ngOnDestroy (): void {
    this.itemNameChangeEvent.unsubscribe();
    this.startDateChangeEvent.unsubscribe();
    this.endDateChangeEvent.unsubscribe();
  }
}
