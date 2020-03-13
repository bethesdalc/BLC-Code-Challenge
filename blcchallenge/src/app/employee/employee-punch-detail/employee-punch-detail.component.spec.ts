import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePunchDetailComponent } from './employee-punch-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { IEmployeePunch } from '../models/iEmployeePunch';

describe('EmployeePunchDetailComponent', () => {
  let component: EmployeePunchDetailComponent;
  let fixture: ComponentFixture<EmployeePunchDetailComponent>;
  let empPunch: IEmployeePunch;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePunchDetailComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePunchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate employee punch form', () => {
    const startTime = new Date(2020, 3, 13, 12, 20);
    const endTime =  new Date(2020, 3, 13, 12, 40);

    component.employeePunch = { id: 1, startTime: startTime, endTime: endTime, employee: { id: 1, firstName: 'Gordon', lastName: 'Huebner', email: 'ghuebner@outlook.com' } };
    component.setupEmployeePunchForm();
    component.displayEmployeePunch();

    expect(component.employeePunchForm.get('startTime').value).toEqual(startTime);
    expect(component.employeePunchForm.get('endTime').value).toEqual(endTime);
  });
});
