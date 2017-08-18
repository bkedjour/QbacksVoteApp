import { Component, OnInit } from '@angular/core';
import { UtilsService } from "./util.service";
import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Vote APP';

  frontendId: string;
  backendId: string;
  appVersion: string;

  constructor(private utils: UtilsService) {
  }

  async ngOnInit() {
    this.backendId = await this.utils.getBackendMachineName();
    this.frontendId = await this.utils.getFrontMachineName();
    this.appVersion = await this.utils.getAppVersion();
  }
}
