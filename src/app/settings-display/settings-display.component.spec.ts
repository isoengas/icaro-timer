import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDisplayComponent } from './settings-display.component';
import { TimePipe } from '../time.pipe';

describe('SettingsDisplayComponent', () => {
  let component: SettingsDisplayComponent;
  let fixture: ComponentFixture<SettingsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsDisplayComponent, TimePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
