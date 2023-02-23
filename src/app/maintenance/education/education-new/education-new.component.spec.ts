import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationNewComponent } from './education-new.component';

describe('EducationNewComponent', () => {
  let component: EducationNewComponent;
  let fixture: ComponentFixture<EducationNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
