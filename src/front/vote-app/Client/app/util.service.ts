import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';
import { ConfigurationService } from "./configuration.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UtilsService {

  constructor(private http: Http, private configurationService: ConfigurationService) {
  }

  async getApiMachineName(): Promise<string> {
    var backendUrl = await this.configurationService.getBackendUrl();

    return this.http.get(backendUrl + "containerinfo")
      .toPromise()
      .then(r => r.text())
      .catch(this.handleError);
  }

  getFrontMachineName(): Promise<string> {
    const baseURI = document.baseURI.endsWith('/') ? document.baseURI : `${document.baseURI}/`;
    let url = `${baseURI}api/settings/machinename`;
    return this.http.get(url)
      .toPromise()
      .then(id => id.text())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
