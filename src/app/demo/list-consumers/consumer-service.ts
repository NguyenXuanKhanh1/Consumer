import { Consumer } from './consumer';

export class ServiceRequest {
    pageIndex: number;

}

export class ServiceResponse {
    status: boolean;
    items: Consumer;
    totalRecords: number;
}