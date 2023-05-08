import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternTimelineComponent } from './intern-timeline.component';

describe('InternTimelineComponent', () => {
  let component: InternTimelineComponent;
  let fixture: ComponentFixture<InternTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
