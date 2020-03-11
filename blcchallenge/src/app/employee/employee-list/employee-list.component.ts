import { Component, OnInit } from '@angular/core';
import { EmployeeRepositoryService } from '../../services/employee-repository.service';
import { Router } from '@angular/router';
import { IEmployee } from '../models/iEmployee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})

export class EmployeeListComponent implements OnInit {
  constructor(
    private employeeRepositoryService: EmployeeRepositoryService,
    private router: Router) { }

  employees: IEmployee[] = [];

  ngOnInit(): void {
    this.employeeRepositoryService.getAll().subscribe((data: any[]) => {
      this.employees = data;
    })
  }

  public editEmployee(employeeId: number): void {
    this.router.navigate(['/employees', employeeId, 'edit'])
  }

  public addEmployee(): void {
    this.router.navigate(['/employees', 0, 'edit'])
  }

  public employeePunch(employeeId: number): void {
    this.router.navigate(['/employees/punches', employeeId])
  }
}