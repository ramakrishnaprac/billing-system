import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AddItemsComponent } from '../add-items/add-items.component';
import { DatePipe } from '@angular/common';
import { InvoiceDetailsService } from 'src/services/invoice-details.service';
import { InvoiceRequest } from 'src/interfaces/invoice-request';
import { SuccessModalComponent } from 'src/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  items = [];

  modalRef: BsModalRef;
  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private pipe: DatePipe,
    private invoiceDetailsService: InvoiceDetailsService
  ) { }
  invoiceForm: FormGroup;
  orgAdress;
  clientAdress;
  paymentDueDate;
  calculatedTotalAmount;
  totalItems;
  customerMobile;
  ngOnInit(): void {
    this.buildForm();
    let item: Items = {} as Items;
    item.itemName = "XXXXXX";
    item.itemQuantity = 10;
    item.totalAmount = 100;
    item.unitPrice = 10;
    this.items.push(item);
  }
  OpenAddInvoiceDialoge() {
    const config: ModalOptions = { class: 'modal-lg' };
    this.modalRef = this.modalService.show(AddItemsComponent, config);

    this.modalRef.content.messageEvent.subscribe(res => {
      console.log("Result from modal", res);
      let item: Items = {} as Items;
      this.items.push(res);
    });


  }

  onClickGenerateTotalAmount() {


    let count: number = 0;
    let totalAmount = 0;

    this.items.forEach((element) => {


      if (element) {
        count = count + element.itemQuantity;
        totalAmount = totalAmount + element.totalAmount;
      }


    });
    this.invoiceForm.controls.totalItems.setValue(count);
    this.invoiceForm.controls.calculatedTotalAmount.setValue(totalAmount);


  }

  onClickGenerate() {

    let invoice: InvoiceRequest = {} as InvoiceRequest;
    invoice.customerAdress = this.invoiceForm.get('clientAdress').value;
    invoice.orgAdress = this.invoiceForm.get('orgAdress').value;
    invoice.paymentDueDate = this.convertDateToString(this.invoiceForm.get('paymentDueDate').value);
    invoice.items = this.items;
    invoice.totalItems = this.invoiceForm.get('totalItems').value;
    invoice.calculatedTotalAmount = this.invoiceForm.get('calculatedTotalAmount').value;
    invoice.customerMobile = this.invoiceForm.get('customerMobile').value;
    this.invoiceDetailsService.saveInvoice(invoice).subscribe((response) => {
      if (response) {
        console.log("SUCCESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
        this.onReset();
        this.items = [];
        this.modalService.show(SuccessModalComponent);
      }
    }, (errors) => {
      console.log("Errors", errors);
    })


  }
  onReset() {
    this.invoiceForm.controls.orgAdress.setValue(undefined);
    this.invoiceForm.controls.clientAdress.setValue(undefined);
    this.invoiceForm.controls.paymentDueDate.setValue(undefined);
    this.invoiceForm.controls.totalItems.setValue(undefined);
    this.invoiceForm.controls.calculatedTotalAmount.setValue(undefined);


  }
  convertDateToString(value: any) : string {
    return this.pipe.transform(value, 'dd/MM/yyyy');
  }
  buildForm() {
    this.invoiceForm = this.fb.group({

      orgAdress: new FormControl(this.orgAdress),
      clientAdress: new FormControl(this.clientAdress),
      paymentDueDate: new FormControl(this.paymentDueDate),
      calculatedTotalAmount: new FormControl(this.calculatedTotalAmount),
      totalItems: new FormControl(this.totalItems),
      customerMobile : new FormControl(this.customerMobile)
    });
  }
  onClickEdit(element, index) {
    console.log("Clicked Delete", element, index);
  }
}
export interface Items {

  
  itemName: string;
  
  itemQuantity: number;
  
  unitPrice: number;
  
  totalAmount: number;

}


