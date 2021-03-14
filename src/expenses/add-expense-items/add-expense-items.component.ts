import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Expense } from '../add-expenses/add-expenses.component';

@Component({
  selector: 'app-add-expense-items',
  templateUrl: './add-expense-items.component.html',
  styleUrls: ['./add-expense-items.component.css']
})
export class AddExpenseItemsComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<Expense>();
  expenseForm: FormGroup;
  expenseDate;
  expenseName;
  category;
  quantity;
  totalAmount;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private pipe : DatePipe,

  ) { }

  ngOnInit(): void {
this.buildForm();

  }
  buildForm() {
    this.expenseForm = this.fb.group({
      expenseDate: new FormControl(this.expenseDate),
      expenseName: new FormControl(this.expenseName),
      category: new FormControl(this.category),
      quantity: new FormControl(this.quantity),
      totalAmount: new FormControl(this.totalAmount),

    });
  }
  onClickSave() {
    let item : Expense = {} as Expense;

    item.expenseDate = this.convertDateToString(this.expenseForm.get('expenseDate').value);
    item.category = this.expenseForm.get('expenseName').value;
    item.name = this.expenseForm.get('category').value;
    item.quantity = this.expenseForm.get('quantity').value;
    item.totalAmount = this.expenseForm.get('totalAmount').value;

    if(item){
      this.messageEvent.emit(item);
      this.onReset();
      this.closeAfterTime();
    }
}

convertDateToString(value: any) {
  return this.pipe.transform(value, 'dd/MM/yyyy');
}
  closeAfterTime(){
    setTimeout(() => {
      this.bsModalRef.hide();
   }, 2000);
 
  }
  onReset() {
    this.expenseForm.controls.expenseDate.setValue(undefined);
    this.expenseForm.controls.expenseName.setValue(undefined);
    this.expenseForm.controls.category.setValue(undefined);
    this.expenseForm.controls.quantity.setValue(undefined);
    this.expenseForm.controls.totalAmount.setValue(undefined);
  }
}
