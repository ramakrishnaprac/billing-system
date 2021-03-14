import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-no-records-found',
  templateUrl: './no-records-found.component.html',
  styleUrls: ['./no-records-found.component.css']
})
export class NoRecordsFoundComponent implements OnInit {

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.closeAfterTime();
  }
  closeAfterTime(){
    setTimeout(() => {
      this.bsModalRef.hide();
   }, 2000);
}

}
