import { TestBed } from '@angular/core/testing';

import { TranscodeService } from './transcode.service';

describe('TranscodeService', () => {
  let service: TranscodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranscodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
