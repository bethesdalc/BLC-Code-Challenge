import { TestBed } from '@angular/core/testing';

import { EmployeePunchListGuard } from './employee-punch-list.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('EmployeePunchListGuard', () => {
  let guard: EmployeePunchListGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    guard = TestBed.inject(EmployeePunchListGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
