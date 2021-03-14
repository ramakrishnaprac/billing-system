import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SampleReportComponent } from './sample-report/sample-report.component';
import {TableModule} from 'primeng/table';
import {ReactiveFormsModule} from '@angular/forms';

import {ButtonModule} from 'primeng/button';
import { BsModalService, BsModalRef, ModalModule} from 'ngx-bootstrap/modal';
import {CalendarModule} from 'primeng/calendar';


@NgModule({
  declarations: [ SampleReportComponent],
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    
    ButtonModule,
    ModalModule,
    CalendarModule
  ]
})
export class ViewReportModule { }
