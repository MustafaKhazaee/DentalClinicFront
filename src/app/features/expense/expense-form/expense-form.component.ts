import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, take } from 'rxjs';
import { AppTextService } from 'src/app/core/appTextService/app-text.service';
import { ProgressDisplayService } from 'src/app/core/progressDisplay/progress-display.service';
import { RepositoryService } from 'src/app/data/repository/repository.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent implements OnInit {
  constructor (private formBuilder: FormBuilder, private repository: RepositoryService, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any, private matDialogRef: MatDialogRef<ExpenseFormComponent>,
    private appText: AppTextService, private progressBarService: ProgressDisplayService) {
    this.editing = data.expense;
  }
  Texts = this.appText.getAppTexts();
  expenseForm = this.formBuilder.group({
    itemName: ['', Validators.required],
    pricePerItem: ['', Validators.required],
    count: ['0', Validators.required],
    date: [],
    description: []
  });
  editing!: boolean;
  appUsers!: any;
  ngOnInit(): void {
    if (this.editing) {
      this.expenseForm.controls['itemName'].setValue(this.data.expense.itemName);
      this.expenseForm.controls['pricePerItem'].setValue(this.data.expense.pricePerItem);
      this.expenseForm.controls['count'].setValue(this.data.expense.count);
      this.expenseForm.controls['date'].setValue(this.data.expense.date);
      this.expenseForm.controls['description'].setValue(this.data.expense.description);
    }
    setTimeout(() => this.progressBarService.hideProgressbar());
  }
  submitForm () {
    this.progressBarService.showProgressbar();
    this.repository.ExpenseRepository.addExpense(this.expenseForm.value).pipe(
      map(r => {
        if (r === 201) {
          this.snackBar.open('Expense added succefully', 'OK', {duration: 3000});
          (document.querySelector('#clearExpenseForm') as HTMLButtonElement).click();
        }
        else if (r === 409)
          this.snackBar.open('Expense already exists', 'OK', {duration: 3000});
        else
          this.snackBar.open('Error occured while adding the expense!', 'OK', {duration: 3000});
        this.progressBarService.hideProgressbar();
      }),
      take(1)
    ).subscribe();
  }
  submitEdit = () =>  {
    this.progressBarService.showProgressbar();
    this.repository.ExpenseRepository.editExpense(this.expenseForm.value, this.data.id).pipe(
      map(r => {
        this.matDialogRef.close({event: 'updated'});
      }),
      take(1)
    ).subscribe();
  }
}
