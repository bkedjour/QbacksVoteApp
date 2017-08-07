import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';
import { ConfigurationService } from "./configuration.service";

@Injectable()
export class VotesService {

  private apiUrl: string;

  constructor(private http: Http, private configurationService: ConfigurationService) {
    configurationService.settingsLoaded.subscribe(r =>
      this.apiUrl = configurationService.serverSettings.apiConnectionString + "/api/");
  }

  getBattle(): Promise<Battle> {
    console.log(`getting the battle ${this.apiUrl}`);
    return this.http.get(this.apiUrl + "votes/")
      .toPromise()
      .then(r => r.json() as Battle)
      .catch(this.handleError);
  }

  getVote(fighter: string): Promise<number> {
    return this.http.get(this.apiUrl + "votes/" + fighter)
      .toPromise()
      .then(r => r.json() as number)
      .catch(this.handleError);
  }

  addVote(fighter: string, vote: number): Promise<number> {

    return this.http.post(this.apiUrl + "votes/" + fighter, JSON.stringify(vote),
      { headers: new Headers({ 'Content-Type': 'application/json' }) })
      .toPromise()
      .then(r => r.json() as number)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
