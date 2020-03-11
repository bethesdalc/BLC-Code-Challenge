import { Component, OnInit } from '@angular/core';
import { EmployeePunchRepositoryService } from '../../services/employee-punch-repository.service';
import { IEmployee } from '../models/iEmployee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeRepositoryService } from '../../services/employee-repository.service';
import { IEmployeePunch } from '../models/iEmployeePunch';

@Component({
  selector: 'app-employee-punch-list',
  templateUrl: './employee-punch-list.component.html',
  styleUrls: ['./employee-punch-list.component.scss']
})

export class EmployeePunchListComponent implements OnInit {
  constructor(private employeePunchRepositoryService: EmployeePunchRepositoryService,
    private employeeRepositoryService: EmployeeRepositoryService,
    private route: ActivatedRoute,
    private router: Router) { }

  employeePunches: IEmployeePunch[] = [];
  filteredEmployeePunches: IEmployeePunch[] = [];
  employee: IEmployee;
  canAddPunch: boolean = true;

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('employeeId');

    this.employeeRepositoryService.getById(id).subscribe((data: IEmployee) => {
      this.employee = data;
    })

    this.employeePunchRepositoryService.getAll().subscribe((data: IEmployeePunch[]) => {
      this.employeePunches = data;
      this.filteredEmployeePunches = this.performEmployeeFilter(id);

      //  If a punch has not been closed with an end time, do not allow user to create new punch
      for (var punch of this.filteredEmployeePunches){
        if (punch.endTime === null)
          this.canAddPunch = false;
      }
    })
  }

  performEmployeeFilter(id: number): IEmployeePunch[] {
    return this.employeePunches.filter((employeePunch: IEmployeePunch) => employeePunch.employee.id === id);
  }

  public editPunch(punchId): void {
    this.router.navigate(['/employees/punches', punchId, this.employee.id, 'edit'])
  }

  public addPunch(): void {
    this.router.navigate(['employees/punches', 0, this.employee.id, 'edit'])
  }

  public employeeList(): void {
    this.router.navigate(['/employees'])

  }
}