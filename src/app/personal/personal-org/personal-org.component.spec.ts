import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalOrgComponent } from './personal-org.component';

describe('PersonalOrgComponent', () => {
  let component: PersonalOrgComponent;
  let fixture: ComponentFixture<PersonalOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
