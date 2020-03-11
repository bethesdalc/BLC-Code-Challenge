import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api'
import { IEmployee } from '../employee/models/iEmployee';
import { IEmployeePunch } from '../employee/models/iEmployeePunch';

@Injectable({
  providedIn: 'root'
})

export class DataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    // When creating the database for the InMemoryDbService, first check local storage to see if any data has been saved.
    // Any saved data in local storage is the persisted data when opening or starting the application. 
    // If there is no persisted data, I am creating a starting database with 3 employees

    // Load from local storage
    var employeeJson = localStorage.getItem('employeeTable');
    var employeePunchesJson = localStorage.getItem('employeePunchTable');

    var employees: IEmployee[];
    var employeePunches: IEmployeePunch[];

    // If there was local storage, parse the data into the employees into InMemoryDB
    // otherwise create base objects upon startup.
    if (employeeJson) {
      employees = JSON.parse(employeeJson);
    }
    else {
      employees = [
        { id: 1, firstName: 'Gordon', lastName: 'Huebner', email: 'ghuebner@outlook.com' },
        { id: 2, firstName: 'Mark', lastName: 'Miers', email: 'mark.miers@bethesdalc.org' },
        { id: 3, firstName: 'Angela', lastName: 'Stuecken', email: 'angela.stuecken@bethesdalc.org' },
      ];

      localStorage.setItem('employeeTable', JSON.stringify(employees));
    }

    // if there was local storage, parse the data into the employee punches into InMemoryDB
    // otherwise create a base object upon startup
    if (employeePunchesJson) {
      employeePunches = JSON.parse(employeePunchesJson)
    }
    else {
      employeePunches = [
        { id: 1, startTime: null, endTime: null, employee: employees[0] },
      ];

      localStorage.setItem('employeePunchTable', JSON.stringify(employeePunches));
    }

    // Return the created database tables
    return { employees, employeePunches };
  }
}
