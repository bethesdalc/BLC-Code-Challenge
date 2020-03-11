import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployeePunch } from '../employee/models/iEmployeePunch';
import { IRepositoryService } from './iRepositoryService';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})

export class EmployeePunchRepositoryService implements IRepositoryService {

  SERVER_URL: string = "http://localhost:8080/api/";
  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get(this.SERVER_URL + 'employeePunches');
  }

  public getById(employeePunchId: number) {
    // if id = 0 return an initialized object since we are creating a new punch
    if (employeePunchId === 0) {
      return of(this.initializeEmployeePunch());
    }

    return this.httpClient.get(`${this.SERVER_URL + 'employeePunches'}/${employeePunchId}`);
  }

  public create(employeePunch: IEmployeePunch) {
    employeePunch.id = null;
    return this.httpClient.post(`${this.SERVER_URL + 'employeePunches'}`, employeePunch)
  }

  public delete(employeePunchId: number) {
    return this.httpClient.delete(`${this.SERVER_URL + 'employeePunches'}/${employeePunchId}`)
  }

  public update(employeePunch: IEmployeePunch) {
    return this.httpClient.put(`${this.SERVER_URL + 'employeePunches'}/${employeePunch.id}`, employeePunch)
  }

  public saveToLocal(): void {
    var employees: IEmployeePunch[] = [];

    this.getAll().subscribe((data: IEmployeePunch[]) => {
      employees = data;
      localStorage.setItem('employeePunchTable', JSON.stringify(employees));
    })
  }

  private initializeEmployeePunch(): IEmployeePunch {
    // Return an initialized object
    return {
      id: 0,
      startTime: null,
      endTime: null,
      employee: null
    };
  }
}
