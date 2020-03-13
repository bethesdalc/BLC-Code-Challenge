import { TestBed } from '@angular/core/testing';

import { EmployeeRepositoryService } from './employee-repository.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EmployeeRepositoryService', () => {
  let service: EmployeeRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EmployeeRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should intiialize new employee', () => {
    var employee = service.initializeEmployee();
    expect(employee.id).toBe(0);
  });
});