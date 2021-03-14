import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';

import {ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { BsModalService, BsModalRef, ModalModule} from 'ngx-bootstrap/modal';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [AddInvoiceComponent],
  
  
  
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    ModalModule,
    CalendarModule
    
  ]
})
export class InvoiceModule { }
