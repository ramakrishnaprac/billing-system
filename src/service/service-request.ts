import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { OperationConfigDetails, ServiceConfig } from "./service-config";
import { map } from 'rxjs/operators';
import { ServiceInput } from "src/interfaces/service-input";






@Injectable()
export class ServiceRequest {

    constructor(private http: HttpClient) {

    }
    processRequest<T, V>(serviceInput: ServiceInput<T, V>):  Observable<any> {

        const opConfigDetail = <OperationConfigDetails>(
            ServiceConfig.getOperationalConfigDetailByOperationCOde(serviceInput.operation)
        );

        const serviceProvider = opConfigDetail.operationDetails.provider;
        const httpMethod = opConfigDetail.operationDetails.method;
        let endPoint = opConfigDetail.operationDetails.endPoint;
        let requestBody: any = serviceInput.requestPayload;

        if (serviceInput.pathParams != null && serviceInput.pathParams.size > 0) {
            for (const key of serviceInput.pathParams.keys()) {
                if (serviceProvider == "YASH") {
                    endPoint = endPoint.replace(
                        '{' + key + '}',
                        <string>serviceInput.pathParams.get(key)

                    );
                }
            }
        }

        let httpParam = new HttpParams();
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('Access-Control-Allow-Methods', 'POST, GET, HEAD, OPTIONS');

            if(serviceInput.params != null && serviceInput.params.size >0){
                for (const key of serviceInput.params.keys()) {
                    httpParam = httpParam.set(key, <string>serviceInput.params.get(key))
                }
            }
        

        const options = {
            params: httpParam,
            headers: headers,
            observe: 'response' as const
        }

        

        switch (httpMethod) {
            case 'GET' :{
            return this.http.get(endPoint, options).pipe(
                map((res)=>{
                    return res.body;
                })
            );
            }

            case 'POST' :{

                
                return this.http.post(endPoint,requestBody,options).pipe(
                    map((res)=>{
                        return res.body;
                    })
                );
            }
            default: { 
                 
                let dummy : any;
                return dummy; 
             } 
      }
      

}
}