import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InvoiceRequest } from 'src/interfaces/invoice-request';
import { ServiceInput } from 'src/interfaces/service-input';

import { ServiceRequest } from 'src/service/service-request';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailsService {

  constructor(
    private http: HttpClient,
    private serviceRequest: ServiceRequest,
  ) { }

  saveInvoice(invoiceRequest: InvoiceRequest) {

    const serviceInput = 
    <ServiceInput<InvoiceRequest, any>>{};

    serviceInput.requestPayload = invoiceRequest;
    serviceInput.operation = "SAVEINVOICE";
    const queryParam = new Map();
    const pathParam = new Map();

    return this.serviceRequest.processRequest<InvoiceRequest, any>(serviceInput);

  }
}


