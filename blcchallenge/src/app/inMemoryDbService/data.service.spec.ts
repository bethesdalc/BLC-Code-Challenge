import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //Mark's Test
  it('Marks test: should contain seed data for employees', () => {
    const db = service.createDb();
    expect(db.employees.length).toBeGreaterThan(0);
    expect(db.employees.map(emp => emp.firstName)).toContain('Mark');
  });

  //Additional tests for punches
  it('should contain seed data for employee punch', () => {
    const db = service.createDb();
    expect(db.employeePunches.length).toBeGreaterThan(0);
    expect(db.employeePunches.map(empPunch => empPunch.id)).toContain(1);
  });

  it('should contain seed data for employee punchs employee', () => {
    const db = service.createDb();
    expect(db.employeePunches.length).toBeGreaterThan(0);
    expect(db.employeePunches.map(empPunch => empPunch.employee.id)).toContain(1);
  });
});
