import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WatchListComponent } from './watch-list/watch-list.component';
import { InstrumentComponent } from './instrument/instrument.component';

@NgModule({
  declarations: [
    AppComponent,
    WatchListComponent,
    InstrumentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
