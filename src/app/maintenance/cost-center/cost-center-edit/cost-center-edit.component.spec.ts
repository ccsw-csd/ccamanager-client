import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterEditComponent } from './cost-center-edit.component';

describe('CostCenterEditComponent', () => {
  let component: CostCenterEditComponent;
  let fixture: ComponentFixture<CostCenterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostCenterEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
