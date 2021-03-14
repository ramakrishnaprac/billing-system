import { Injectable } from '@angular/core';
import { ServiceInput } from 'src/interfaces/service-input';
import { HttpClient } from '@angular/common/http';
import { ServiceRequest } from 'src/service/service-request';
import { ExpensesData } from 'src/expenses/add-expenses/add-expenses.component';
@Injectable({
  providedIn: 'root'
})
export class ExpensesDetailsService {

  constructor(
    private http: HttpClient,
    private serviceRequest: ServiceRequest,
  ) { }

  saveExpense(expenseRequest: ExpensesData) {

    const serviceInput = 
    <ServiceInput<ExpensesData, any>>{};

    serviceInput.requestPayload = expenseRequest;
    serviceInput.operation = "SAVEEXPENSE";
    const queryParam = new Map();
    const pathParam = new Map();

    return this.serviceRequest.processRequest<ExpensesData, any>(serviceInput);

  }
}
