import { Component, Input, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from "rxjs";

import { DBService } from '../services';
import { Sticker } from '../models';
import { AppConstants } from '../constants';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['sticker.component.scss']
})
export class StickerComponent implements OnInit, OnDestroy {
  @Input() data: Sticker;
  @ViewChild('titleInput') titleInput: ElementRef;
  @ViewChild('descriptionInput') descriptionInput: ElementRef;
  isEditingTitle: boolean;
  isEditingDescription: boolean;
  update$: Subject<any> = new Subject();
  sub: Subscription;

  constructor(
    private el: ElementRef,
    private dbService: DBService
  ) {}

  ngOnInit() {
    if (!this.data.stickerClass) {
      this.el.nativeElement.children[0].classList.add('scale-out');
      setTimeout(() => {
        this.el.nativeElement.children[0].classList.add('scale-in')
      }, 100);
      this.data.stickerClass = this.randomColorPick();
    }

    this.el.nativeElement.children[0].classList.add(this.data.stickerClass);

    if (this.data.position.left || this.data.position.top) {
      this.el.nativeElement.children[0].style.left = this.data.position.left + 'px';
      this.el.nativeElement.children[0].style.top = this.data.position.top + 'px';
    }

    this.sub = this.update$
      .debounceTime(50)
      .subscribe(this.updateStickerInDB);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  editTitle() {
    this.isEditingTitle = true;
    setTimeout(() => this.titleInput.nativeElement.focus());
  }

  editDescription() {
    this.isEditingDescription = true;
    setTimeout(() => this.descriptionInput.nativeElement.focus());
  }

  updateTitle() {
    this.isEditingTitle = false;
    this.updateSticker();
  }

  updateDescription() {
    this.isEditingDescription = false;
    this.updateSticker();
  }

  updateStickerPos(pos) {
    this.data.position = pos;
    this.updateSticker();
  }

  removeSticker() {
    this.el.nativeElement.children[0].classList.add('scale-out');
    setTimeout(() => {
      this.el.nativeElement.remove();
      this.dbService.deleteItem(this.data);
    }, 200);
  }

  private updateSticker() {
    this.update$.next();
  }

  private updateStickerInDB = () => {
    this.dbService.updateItem(this.data);
  };

  private randomColorPick(): String {
    return AppConstants.stickerColors[Math.floor(Math.random() * AppConstants.stickerColors.length)];
  }
}
