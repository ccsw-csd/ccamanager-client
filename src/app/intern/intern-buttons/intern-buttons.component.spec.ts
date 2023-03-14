import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternButtonsComponent } from './intern-buttons.component';

describe('InternButtonsComponent', () => {
  let component: InternButtonsComponent;
  let fixture: ComponentFixture<InternButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
