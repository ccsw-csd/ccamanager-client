import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSynchronizeLdapComponent } from './personal-synchronize-ldap.component';

describe('PersonalSynchronizeLdapComponent', () => {
  let component: PersonalSynchronizeLdapComponent;
  let fixture: ComponentFixture<PersonalSynchronizeLdapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalSynchronizeLdapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalSynchronizeLdapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
