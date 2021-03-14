import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceInput } from 'src/interfaces/service-input';

import { ServiceRequest } from 'src/service/service-request';

import { Request } from '../view-report/sample-report/sample-report.component';
@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(
    private http: HttpClient,
    private serviceRequest: ServiceRequest,
  ) { }

fetchReportData(request : Request){
  const serviceInput = 
  <ServiceInput<Request, any>>{};

  serviceInput.requestPayload = request;
  serviceInput.operation = "FETCHREPORT";
  const queryParam = new Map();

  queryParam.set("fromDate", request.fromDate);
  queryParam.set("toDate", request.toDate);
  queryParam.set("month", request.month);

  const pathParam = new Map();
serviceInput.params = queryParam;
serviceInput.pathParams = pathParam;
  return this.serviceRequest.processRequest<Request, any>(serviceInput);
}

}
