import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternSynchronizeLdapComponent } from './intern-synchronize-ldap.component';

describe('InternSynchronizeLdapComponent', () => {
  let component: InternSynchronizeLdapComponent;
  let fixture: ComponentFixture<InternSynchronizeLdapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternSynchronizeLdapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternSynchronizeLdapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
