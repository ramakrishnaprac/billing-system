import { Component } from '@angular/core';

import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

import { AddItemsComponent } from 'src/invoice/add-items/add-items.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-billing-system-app';
constructor(private modalService : BsModalService){

}
modalRef: BsModalRef;
OpenDialogue(){
  const config: ModalOptions = { class: 'modal-lg' };
this.modalRef = this.modalService.show(AddItemsComponent, config);
}
}
