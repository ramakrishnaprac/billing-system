import { DatePipe } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NoRecordsFoundComponent } from 'src/modals/success-modal/no-records-found/no-records-found.component';
import { ReportServiceService } from 'src/services/report-service.service';

@Component({
  selector: 'app-sample-report',
  templateUrl: './sample-report.component.html',
  styleUrls: ['./sample-report.component.css']
})
export class SampleReportComponent implements OnInit {
  showTable: boolean = false;
  monthString: string;
  showNoRecordsFound: boolean = false;
;

  constructor(
    private fb: FormBuilder,
    private pipe: DatePipe,
    private reportServiceService: ReportServiceService,
    private modalService: BsModalService,
  ) { }
  reportForm: FormGroup;
  fromDate;
  toDate;

  expenses: Response[] = [];




  ngOnInit(): void {
    this.buildForm();
  }
  onClickReset() {
    this.reportForm.controls.fromDate.setValue(undefined);
    this.reportForm.controls.toDate.setValue(undefined);
    this.expenses = [];
    this.showTable = false;
  }
  buildForm() {
    this.reportForm = this.fb.group({
      fromDate: new FormControl(this.fromDate),
      toDate: new FormControl(this.toDate)
    });
  }
  
  onClickView() {

    let request: Request = {} as Request;

    request.fromDate = this.convertDateToString(this.reportForm.get('fromDate').value);

    request.toDate = this.convertDateToString(this.reportForm.get('toDate').value);

    let sample: string[] = request.fromDate.split("/");
    request.month = sample[1];
    this.reportServiceService.fetchReportData(request).subscribe((response) => {

      if(response.dataPresent == "Yes"){
        this.expenses = response.list;
      this.monthString = response.month;
      if (this.expenses.length > 0) {
        this.showTable = true;
      }
      
      }
      else{
        this.showTable = false;
        this.showNoRecordsFound = true;
        this.modalService.show(NoRecordsFoundComponent);
      }

    }, (errors) => {
      console.log("errors", errors)
    });


  }
  convertDateToString(value: any): string {
    return this.pipe.transform(value, 'yyyy/MM/dd');
  }
}
export interface Request {

  month: string;
  fromDate: string;
  toDate: string;

}

export interface Response {

  amount: number;
  componentName: string;
}


