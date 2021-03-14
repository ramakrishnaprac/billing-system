import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {  ModalModule} from 'ngx-bootstrap/modal';
import {CalendarModule} from 'primeng/calendar';
import { AddExpensesComponent } from './add-expenses/add-expenses.component';
import { AddExpenseItemsComponent } from './add-expense-items/add-expense-items.component';



@NgModule({
  declarations: [AddExpensesComponent, AddExpenseItemsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    ModalModule,
    CalendarModule
  ]
})
export class ExpensesModule { }
