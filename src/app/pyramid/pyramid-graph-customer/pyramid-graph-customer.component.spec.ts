import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PyramidGraphCustomerComponent } from './pyramid-graph-customer.component';

describe('PyramidGraphCustomerComponent', () => {
  let component: PyramidGraphCustomerComponent;
  let fixture: ComponentFixture<PyramidGraphCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PyramidGraphCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PyramidGraphCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
