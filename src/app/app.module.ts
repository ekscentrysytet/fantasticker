import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import {
  HeaderComponent,
  FooterComponent,
  SharedModule,
  DBService
} from './shared';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule
  ],
  providers: [
    DBService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
