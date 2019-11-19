import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceRequest, ServiceResponse } from './consumer-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListConsumersService {
  public url = 'http://192.168.35.108:8001/consumers'
  constructor(private http: HttpClient) {}
  public getData(request: ServiceRequest): Observable<ServiceResponse> {
    return this.http.get(this.url).pipe(map((res: any) => {
      var response = ({
        status: true,
        totalRecords: res.data.length,
        items: res.data
      });
      console.log(response);
      return response;
    }));
  }

  public deleteData(id) {
    return this.http.delete(this.url + '/' + id);
  }
}
