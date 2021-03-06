import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { StopwatchComponent} from './stopwatch/stopwatch.component';
import { StatusDisplayComponent} from './status-display/status-display.component';
import { RoundDisplayComponent} from './round-display/round-display.component';
import { SettingsComponent } from './settings/settings.component';
import { Timer } from './services/timer';
import { ClockService } from './services/clock.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SettingsDisplayComponent } from './settings-display/settings-display.component';
import { NumericInputComponent } from './numeric-input/numeric-input.component';
import { TimePipe } from './time.pipe';
import { StorageService } from './services/storage.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        StopwatchComponent,
        StatusDisplayComponent,
        RoundDisplayComponent,
        SettingsComponent,
        ToolbarComponent,
        SettingsDisplayComponent,
        NumericInputComponent,
        TimePipe
      ],
      providers: [
        Timer,
        ClockService,
        StorageService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
