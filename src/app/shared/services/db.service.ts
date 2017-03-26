import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';

import { Sticker } from '../models';

@Injectable()
export class DBService {
  db: any;

  init() {
    this.db = new PouchDB('fantasticker');
  }

  addItem(item: Sticker) {
    return this.db.post(item);
  }

  updateItem(item: Sticker) {
    return this.db.put(item);
  }

  deleteItem(item: Sticker) {
    return this.db.remove(item);
  }

  getItems(): any {
    return this.db.allDocs({
      include_docs: true,
      descending: true
    });
  }

  changes() {
    return this.db.changes({
      since: 'now',
      live: true
    });
  }
}
