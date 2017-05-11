import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDisplayComponent } from './status-display.component';

describe('StatusDisplayComponent', () => {
  let component: StatusDisplayComponent;
  let fixture: ComponentFixture<StatusDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
