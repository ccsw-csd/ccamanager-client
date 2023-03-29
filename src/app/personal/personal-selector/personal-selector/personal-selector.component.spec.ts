import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSelectorComponent } from './personal-selector.component';

describe('PersonalSelectorComponent', () => {
  let component: PersonalSelectorComponent;
  let fixture: ComponentFixture<PersonalSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
