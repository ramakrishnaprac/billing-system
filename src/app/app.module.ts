import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {InvoiceModule} from '../invoice/invoice.module';
import {ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';

import {AddItemsComponent} from '../invoice/add-items/add-items.component';
import {  ModalModule} from 'ngx-bootstrap/modal';
import {BsModalService} from 'ngx-bootstrap/modal';
import {CalendarModule} from 'primeng/calendar';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExpensesModule } from 'src/expenses/expenses.module';
import { ServiceRequest } from 'src/service/service-request';
import { HttpClientModule } from '@angular/common/http';
import { ViewReportModule } from 'src/view-report/view-report.module';
@NgModule({
  declarations: [
    AppComponent,
    AddItemsComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InvoiceModule,
    ExpensesModule,
    ViewReportModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    ModalModule.forRoot(),
    CalendarModule,
    RouterModule,
    HttpClientModule
    
  ],
  providers: [
    BsModalService, DatePipe,ServiceRequest
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
