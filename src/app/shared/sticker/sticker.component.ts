import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';

import { DBService } from '../services';
import { Sticker } from '../models';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['sticker.component.scss']
})
export class StickerComponent implements OnInit {
  @Input() data: Sticker;
  @ViewChild('titleInput') titleInput: ElementRef;
  @ViewChild('descriptionInput') descriptionInput: ElementRef;
  isEditingTitle: boolean;
  isEditingDescription: boolean;
  stickerColors = ['amber', 'blue', 'green', 'orange'];

  constructor(
    private el: ElementRef,
    private dbService: DBService
  ) {}

  ngOnInit() {
    const stickerClass = this.data.stickerClass ? this.data.stickerClass : this.randomColorPick();
    if (!this.data.stickerClass) {
      this.data.stickerClass = stickerClass;
    }

    this.el.nativeElement.children[0].classList.add(stickerClass);

    if (this.data && (this.data.position.left || this.data.position.top)) {
      this.el.nativeElement.children[0].style.left = this.data.position.left + 'px';
      this.el.nativeElement.children[0].style.top = this.data.position.top + 'px';
    }
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
    this.el.nativeElement.remove();
    this.dbService.deleteItem(this.data);
  }

  private updateSticker() {
    this.dbService.updateItem(this.data);
  }

  private randomColorPick(): String {
    return this.stickerColors[Math.floor(Math.random() * this.stickerColors.length)];
  }
}
