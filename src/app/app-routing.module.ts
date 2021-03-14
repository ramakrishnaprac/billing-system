import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExpensesComponent } from 'src/expenses/add-expenses/add-expenses.component';
import { SampleReportComponent } from 'src/view-report/sample-report/sample-report.component';

import { AddInvoiceComponent} from '../invoice/add-invoice/add-invoice.component';


const routes: Routes = [

  {path : "addInvoice" , component : AddInvoiceComponent},
  {path : "addExpenses", component : AddExpensesComponent},
  {path : "viewReport", component : SampleReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
