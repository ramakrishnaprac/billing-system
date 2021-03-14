import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Items } from '../add-invoice/add-invoice.component';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<Items>();

  constructor(private fb : FormBuilder,
    public bsModalRef: BsModalRef) { }
  itemsForm : FormGroup;
  itemName;
  itemQuantity;
  unitPrice;
  totalAmount;
  ngOnInit(): void {
    this.buildForm();
    this.itemsForm.get("unitPrice").valueChanges.subscribe(res => {
      if(this.itemsForm.get('itemQuantity').value){
        let x = <number>this.itemsForm.get('itemQuantity').value;
        let y = <number>res;
        this.itemsForm.controls.totalAmount.setValue(x*y);
      }
   });
   this.itemsForm.get("itemQuantity").valueChanges.subscribe(res => {
    if(this.itemsForm.get('unitPrice').value){
      let x = <number>res;
      let y = <number>this.itemsForm.get('unitPrice').value;
      this.itemsForm.controls.totalAmount.setValue(x*y);
    }
 })
  }
  buildForm(){
    this.itemsForm = this.fb.group({
      itemName : new FormControl(this.itemName),
      itemQuantity : new FormControl(this.itemQuantity),
      unitPrice : new FormControl(this.unitPrice),
      totalAmount : new FormControl(this.totalAmount)
    })
  }

  onClickSave(){
    let item : Items = {} as Items;

    item.itemName = this.itemsForm.get('itemName').value;
    item.itemQuantity = this.itemsForm.get('itemQuantity').value;
    item.unitPrice = this.itemsForm.get('unitPrice').value;
    item.totalAmount = this.itemsForm.get('totalAmount').value;

    console.log("Form Result", item);
    if(item != null){
      this.messageEvent.emit(item);
      this.onReset();
      this.closeAfterTime();
 }
  }
  
onReset(){
    this.itemsForm.controls.itemName.setValue(undefined);
    this.itemsForm.controls.itemQuantity.setValue(undefined);
    this.itemsForm.controls.unitPrice.setValue(undefined);
    this.itemsForm.controls.totalAmount.setValue(undefined);
    
  }

  closeAfterTime(){
    setTimeout(() => {
      this.bsModalRef.hide();
   }, 2000);
 
  }

}
