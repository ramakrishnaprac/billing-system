import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

import { DatePipe } from '@angular/common';
import { AddExpenseItemsComponent } from '../add-expense-items/add-expense-items.component';
import { ExpensesDetailsService } from 'src/services/expenses-details.service';
import { SuccessModalComponent } from 'src/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.css']
})
export class AddExpensesComponent implements OnInit {

  expensesForm: FormGroup;
  fromDate;
  toDate;
  calculatedTotalAmount;
  totalExpenses;
  modalRef: BsModalRef;
  
  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private pipe: DatePipe,
private expensesDetailsService : ExpensesDetailsService
  ) { }

  expenses: Expense[] = [];
  ngOnInit(): void {
    
    this.buildForm();

  }
  buildForm() {
    this.expensesForm = this.fb.group({
      fromDate: new FormControl(this.fromDate),
      toDate: new FormControl(this.toDate),
      totalExpenses : new FormControl(this.totalExpenses),
      calculatedTotalAmount : new FormControl(this.calculatedTotalAmount)
    });
  }
  onClickGenerate() {
    let item: ExpensesData = {} as ExpensesData;
    item.fromDate = this.convertDateToString(this.expensesForm.get('fromDate').value);
    item.toDate = this.convertDateToString(this.expensesForm.get('toDate').value);
    item.expenses = this.expenses;
    item.totalExpenses = this.expensesForm.get('totalExpenses').value;
    item.calculatedTotalAmount = this.expensesForm.get('calculatedTotalAmount').value;

    this.expensesDetailsService.saveExpense(item).subscribe((response)=>{
      if (response) {
        console.log("SUCCESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
        this.onReset();
        this.expenses = [];
        this.modalService.show(SuccessModalComponent);
      }
    },  (error)=>{
      console.log("Errors", error);
    });
  }
  onClickdelete(){

  }
  onClickEdit(){

  }
  convertDateToString(value: any) {
    return this.pipe.transform(value, 'dd/MM/yyyy');
  }
  onReset() {
    this.expensesForm.controls.fromDate.setValue(undefined);
    this.expensesForm.controls.toDate.setValue(undefined);
    this.expensesForm.controls.totalExpenses.setValue(undefined);
    this.expensesForm.controls.calculatedTotalAmount.setValue(undefined);
  }
  OpenAddExpenseDialoge() {
    const config: ModalOptions = { class: 'modal-lg' };
    this.modalRef = this.modalService.show(AddExpenseItemsComponent, config);

    this.modalRef.content.messageEvent.subscribe(res => {
      this.expenses.push(res);
    });
    

  }
  calculationOfTotalAmount(){
    let expensesCount : number = 0;
    let totalExpensesAmount : number = 0;
    this.expenses.forEach((element)=>{
      if(element){
     expensesCount = expensesCount + 1 ;
     totalExpensesAmount = totalExpensesAmount + <number> element.totalAmount;
      }
    });
    this.expensesForm.controls.totalExpenses.setValue(expensesCount);
    this.expensesForm.controls.calculatedTotalAmount.setValue(totalExpensesAmount);
  }
}
export interface Expense {
  expenseDate: string;
  name: string;
  category: string;
  quantity: number;
  totalAmount: number;
}

export interface ExpensesData {
  fromDate: string;
  toDate: string;
  expenses: Expense[];
  totalExpenses : number;
  calculatedTotalAmount : number;
}
