import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { StatusDisplayComponent } from './status-display/status-display.component';
import { Timer } from './services/timer';
import { ClockService } from './services/clock.service';
import { RoundDisplayComponent } from './round-display/round-display.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SettingsComponent } from './settings/settings.component';
import { NumericInputComponent } from './numeric-input/numeric-input.component';
import { SettingsDisplayComponent } from './settings-display/settings-display.component';
import { TimePipe } from './time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    StopwatchComponent,
    StatusDisplayComponent,
    RoundDisplayComponent,
    ToolbarComponent,
    SettingsComponent,
    NumericInputComponent,
    SettingsDisplayComponent,
    TimePipe
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
