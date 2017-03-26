import { Component, OnInit } from '@angular/core';

import { Sticker } from '../shared/models';
import { DBService } from '../shared';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['board.component.scss']
})
export class BoardComponent implements OnInit {
  stickers: Array<Sticker> = [];
  loading: boolean = true;

  constructor(
    private dbService: DBService
  ) {}

  ngOnInit() {
    this.dbService.getItems()
      .then(docs => {
        this.loading = false;
        if (docs.rows.length) {
          this.stickers = docs.rows.map(item => item.doc);
        }
      });

    this.dbService.changes().on('change', this.syncItems.bind(this))
  }

  syncItems() {
    this.dbService.getItems()
      .then(docs => this.stickers = docs.rows.map(item => item.doc));
  }

  addSticker() {
    const sticker = new Sticker();

    this.dbService.addItem(sticker);
  }
}
