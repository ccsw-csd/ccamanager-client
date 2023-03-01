import { TestBed } from '@angular/core/testing';

import { EducationCenterService } from './education-center.service';

describe('EducationCenterService', () => {
  let service: EducationCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
