import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { StatusDisplayComponent } from './status-display/status-display.component';
import { Timer } from './services/timer';
import { ClockService } from './services/clock.service';

@NgModule({
  declarations: [
    AppComponent,
    StopwatchComponent,
    StatusDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    Timer,
    ClockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
