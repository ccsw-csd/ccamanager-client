import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternEditComponent } from './intern-edit.component';

describe('InternEditComponent', () => {
  let component: InternEditComponent;
  let fixture: ComponentFixture<InternEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
