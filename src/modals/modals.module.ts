import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { NoRecordsFoundComponent } from './success-modal/no-records-found/no-records-found.component';



@NgModule({
  declarations: [SuccessModalComponent, NoRecordsFoundComponent],
  imports: [
    CommonModule
  ]
})
export class ModalsModule { }
