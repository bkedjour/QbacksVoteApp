import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';

@Injectable()
export class VotesService {

  constructor(private http: Http) {
  }

  async getBattle(): Promise<Battle> {
    return this.http.get(environment.baseURI + "votes/")
      .toPromise()
      .then(r => r.json() as Battle)
      .catch(this.handleError);
  }

  async getVote(fighter: string): Promise<number> {
    return this.http.get(environment.baseURI + "votes/" + fighter)
      .toPromise()
      .then(r => r.json() as number)
      .catch(this.handleError);
  }

  async addVote(fighter: string, vote: number): Promise<number> {
    return this.http.post(environment.baseURI + "votes/" + fighter, JSON.stringify(vote),
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
