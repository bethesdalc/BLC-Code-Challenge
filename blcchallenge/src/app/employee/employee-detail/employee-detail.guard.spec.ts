import { TestBed } from '@angular/core/testing';

import { EmployeeDetailGuard } from './employee-detail.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('EmployeeDetailGuard', () => {
  let guard: EmployeeDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    guard = TestBed.inject(EmployeeDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
