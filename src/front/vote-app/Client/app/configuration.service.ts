import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, RequestMethod, Headers } from '@angular/http';
import { IConfiguration } from './configuration.model';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ConfigurationService {
    serverSettings: IConfiguration;
    isReady: boolean = false;

    constructor(private http: Http) {
    }

    getConfiguration(): Promise<IConfiguration> {
        const baseURI = document.baseURI.endsWith('/') ? document.baseURI : `${document.baseURI}/`;
        let url = `${baseURI}api/settings`;
        return this.http.get(url).toPromise()
            .then((response: Response) => {
                console.log(`settings loaded (url): ${url}`);
                this.serverSettings = response.json();
                this.isReady = true;
                return this.serverSettings;
            });
    }

    async getBackendUrl() {
        if (this.isReady) {
            return `http://${this.serverSettings.backendConnectionString}/api/`;
        }

        var config = await this.getConfiguration();
        return `http://${config.backendConnectionString}/api/`;
    }
}