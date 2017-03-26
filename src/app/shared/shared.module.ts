import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StickerComponent } from './sticker';

import { DraggableDirective } from './directives';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    StickerComponent,
    DraggableDirective
  ],
  exports: [
    StickerComponent,
    DraggableDirective
  ]
})
export class SharedModule {}
