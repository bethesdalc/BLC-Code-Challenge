import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailComponent } from './employee-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import {IEmployee} from '../models/iEmployee'


describe('EmployeeDetailComponent', () => {
  let component: EmployeeDetailComponent;
  let fixture: ComponentFixture<EmployeeDetailComponent>;
  let emp: IEmployee;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDetailComponent ],
      providers: [FormBuilder],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate employee form', () => {
    component.createEmployeeForm();
    emp = { id: 1, firstName: 'Gordon', lastName: 'Huebner', email: 'ghuebner@outlook.com' };
    component.displayEmployee(emp);

    expect(component.employeeForm.get('email').value).toEqual('ghuebner@outlook.com');
  });
});
