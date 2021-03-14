export interface ServiceInput<T, V> {

    operation: string;
    serviceName: string;
    requestPayload?: T;
    responsePayload?: V;
    userCOde: string;
    params: Map<string, string>;
    pathParams: Map<string, string>;
    endPoint: string;
  
  }