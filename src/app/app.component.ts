import { Component, OnInit } from '@angular/core';

import { DBService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private dbService: DBService
  ) {}

  ngOnInit() {
    this.dbService.init();
  }
}
