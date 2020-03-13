import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IEmployee } from '../employee/models/iEmployee';
import { IRepositoryService } from './iRepositoryService';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmployeeRepositoryService implements IRepositoryService {
  SERVER_URL: string = "http://localhost:8080/api/";
  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get(this.SERVER_URL + 'employees');
  }

  public getById(employeeId: number) {
    // if id = 0 return an initialized object since we are creating a new employee
    if (employeeId === 0) {
      return of(this.initializeEmployee());
    }

    return this.httpClient.get(`${this.SERVER_URL + 'employees'}/${employeeId}`);
  }

  public create(employee: IEmployee) {
    employee.id = null;
    return this.httpClient.post(`${this.SERVER_URL + 'employees'}`, employee)
  }

  public delete(employeeId: number) {
    return this.httpClient.delete(`${this.SERVER_URL + 'employees'}/${employeeId}`)
  }

  public update(employee: IEmployee) {
    return this.httpClient.put(`${this.SERVER_URL + 'employees'}/${employee.id}`, employee)
  }

  public saveToLocal(): void {
    var employees: IEmployee[] = [];

    this.getAll().subscribe((data: IEmployee[]) => {
      employees = data;
      localStorage.setItem('employeeTable', JSON.stringify(employees));
    })
  }

  public initializeEmployee(): IEmployee {
    // Return an initialized object
    return {
      id: 0,
      firstName: null,
      lastName: null,
      email: null
    };
  }
}
