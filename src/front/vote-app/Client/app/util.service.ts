import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';
import { ConfigurationService } from "./configuration.service";

@Injectable()
export class UtilsService {

  private apiUrl: string;

  constructor(private http: Http, configurationService: ConfigurationService) {
    configurationService.settingsLoaded.subscribe(r =>
      this.apiUrl = `http://${configurationService.serverSettings.backendConnectionString}/api/`);
  }

  getApiMachineName(): Promise<string> {
    return this.http.get(this.apiUrl + "containerinfo")
      .toPromise()
      .then(r => r.text())
      .catch(this.handleError);
  }

  getFrontMachineName(): string {
    return "you need to find it :)";
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
