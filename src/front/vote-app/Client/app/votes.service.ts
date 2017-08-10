import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';
import { ConfigurationService } from "./configuration.service";

@Injectable()
export class VotesService {

  constructor(private http: Http, private configurationService: ConfigurationService) {
  }

  async getBattle(): Promise<Battle> {
    var backendUrl = await this.configurationService.getBackendUrl();

    return this.http.get(backendUrl + "votes/")
      .toPromise()
      .then(r => r.json() as Battle)
      .catch(this.handleError);
  }

  async getVote(fighter: string): Promise<number> {
    var backendUrl = await this.configurationService.getBackendUrl();

    return this.http.get(backendUrl + "votes/" + fighter)
      .toPromise()
      .then(r => r.json() as number)
      .catch(this.handleError);
  }

  async addVote(fighter: string, vote: number): Promise<number> {
    var backendUrl = await this.configurationService.getBackendUrl();

    return this.http.post(backendUrl + "votes/" + fighter, JSON.stringify(vote),
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
