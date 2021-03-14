import { Items } from "src/invoice/add-invoice/add-invoice.component";

export interface InvoiceRequest {

  
    orgAdress: string;
    customerAdress: string;
    customerMobile : string;
    items: Items[];
    paymentDueDate: string;
    totalItems : string;
    calculatedTotalAmount : string;
  
  
  }