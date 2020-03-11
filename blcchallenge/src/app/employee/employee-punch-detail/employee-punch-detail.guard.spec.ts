import { TestBed } from '@angular/core/testing';

import { EmployeePunchDetailGuard } from './employee-punch-detail.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('EmployeePunchDetailGuard', () => {
  let guard: EmployeePunchDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    guard = TestBed.inject(EmployeePunchDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
