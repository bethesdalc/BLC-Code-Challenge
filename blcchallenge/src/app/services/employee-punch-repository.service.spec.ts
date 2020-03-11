import { TestBed } from '@angular/core/testing';

import { EmployeePunchRepositoryService } from './employee-punch-repository.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EmployeePunchRepositoryService', () => {
  let service: EmployeePunchRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]});
    service = TestBed.inject(EmployeePunchRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
