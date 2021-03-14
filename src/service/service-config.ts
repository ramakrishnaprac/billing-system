import * as serviceConfig from '../config/service-config.json';


export class ServiceConfig {

    static getOperationalConfigDetailByOperationCOde(opCode: string) {
        let configData: any;
        configData = (<any>serviceConfig).default[opCode];
        console.log("Config Data by Op code", configData);
        const opConfigDetail = <OperationConfigDetails>{};
        if (configData) {
            opConfigDetail.operationDescription = configData.operationDescription;
            const opDetail = <OperationDetails>{};
            opDetail.provider = configData.operationDetails.provider;
            opDetail.endPoint = configData.operationDetails.endPoint;
            opDetail.method = configData.operationDetails.method;
            opDetail.pathParam = configData.operationDetails.pathParam;
            opDetail.queryParam = configData.operationDetails.queryParam;
            opConfigDetail.operationDetails = opDetail;
        }
        else {
            console.log("No Proper Config");
        }
        return opConfigDetail;
    }

}

export interface OperationConfigDetails {
    operationDescription: string;
    operationDetails: OperationDetails;
}
export interface OperationDetails {
    provider: string;
    method: string;
    endPoint: string;
    queryParam: string[];
    pathParam: string[];
    entityType: string;
}