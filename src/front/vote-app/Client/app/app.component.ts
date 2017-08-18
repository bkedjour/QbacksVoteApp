import { Component, OnInit } from '@angular/core';
import { UtilsService } from "./util.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Vote APP';

  frontendId: string;
  backendId: string;

  constructor(private utils: UtilsService) {
  }

  async ngOnInit() {
    this.backendId = await this.utils.getBackendMachineName();
    this.frontendId = await this.utils.getFrontMachineName();
  }
}
