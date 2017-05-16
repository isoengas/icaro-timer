import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { StopwatchComponent} from './stopwatch/stopwatch.component';
import { StatusDisplayComponent} from './status-display/status-display.component';
import { Timer } from './models/timer';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        StopwatchComponent,
        StatusDisplayComponent
      ],
      providers: [
        Timer
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
