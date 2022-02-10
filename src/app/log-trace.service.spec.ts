import { TestBed } from '@angular/core/testing';

import { LogTraceService } from './log-trace.service';

describe('LogTraceService', () => {
  let service: LogTraceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogTraceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
