import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';
import { Observable } from "rxjs/Observable";

@Injectable()
export class UtilsService {

  constructor(private http: Http) {
  }

  getBackendMachineName(): Promise<string> {
    return this.http.get(environment.baseURI + "environment/machinename/back")
      .toPromise()
      .then(r => r.text())
      .catch(this.handleError);
  }

  getFrontMachineName(): Promise<string> {
    return this.http.get(environment.baseURI + "environment/machinename/front")
      .toPromise()
      .then(id => id.text())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
