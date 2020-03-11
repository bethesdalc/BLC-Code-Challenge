import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../models/iEmployee';
import { IEmployeePunch } from '../models/iEmployeePunch';
import { EmployeeRepositoryService } from '../../services/employee-repository.service';
import { EmployeePunchRepositoryService } from '../../services/employee-punch-repository.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})

export class EmployeeDetailComponent implements OnInit {
  constructor(
    private employeeRepositoryService: EmployeeRepositoryService,
    private employeePunchRepositoryService: EmployeePunchRepositoryService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }

  pageTitle = 'Employee Edit';
  employeeForm: FormGroup;
  employee: IEmployee;

  ngOnInit(): void {
    this.createEmployeeForm();

    let id = +this.route.snapshot.paramMap.get('id');
    this.employeeRepositoryService.getById(id).subscribe((data: IEmployee) => {
      this.displayEmployee(data);
    })
  }

  createEmployeeForm(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(25), Validators.pattern('[a-zA-Z]*')]],
      lastName: ['', [Validators.required, Validators.maxLength(40), Validators.pattern('[a-zA-Z]*')]],
      email: ['', [Validators.required, Validators.maxLength(256), Validators.email]],
    })
  }

  displayEmployee(employee: IEmployee): void {
    if (this.employeeForm) {
      this.employeeForm.reset();
    }
    this.employee = employee;

    if (this.employee.id === 0) {
      this.pageTitle = 'Add Employee';
    } else {
      this.pageTitle = `Edit Employee: ${this.employee.id}`;
    }

    // Update the data on the form
    this.employeeForm.setValue({
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      email: this.employee.email,
    });
  }

  public saveEmployee(): void {
    if (this.employeeForm.valid) {
      if (this.employeeForm.dirty) {
        // update the employee object with values from the form
        const emp = { ...this.employee, ...this.employeeForm.value };

        if (emp.id === 0) {
          this.employeeRepositoryService.create(emp).subscribe((ret) => {
            this.employeeRepositoryService.saveToLocal();
            this.onSaveComplete();
          })
        } else {
          this.employeeRepositoryService.update(emp).subscribe((ret) => {
            this.employeeRepositoryService.saveToLocal();
            this.onSaveComplete();
          })
        }
      } else {
        this.onSaveComplete();
      }
    }
  }

  public deleteEmployee(): void {
    // Since the employee forms Delete button is not displayed on a new employee, they should never even reach this code.
    // However, still checking just in case it si called from another method in the future.
    if (this.employee.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the employee: ${this.employee.id}?`)) {
        this.employeeRepositoryService.delete(this.employee.id).subscribe((ret) => {
          this.employeeRepositoryService.saveToLocal();
          this.onSaveComplete();
        })
      }
    }
  }

  public deleteEmployeePunches(): void {
    // Get all punches since we dont have a way yet to just get employee punches
    this.employeePunchRepositoryService.getAll().subscribe((data: IEmployeePunch[]) => {
      var employeePunches = data;

      // Loop through all punches and delete onces which match the employee.id within the punch
      employeePunches.forEach(punch => {
        if (punch.employee.id === this.employee.id) {
          this.employeePunchRepositoryService.delete(punch.id).subscribe((ret) => {
            this.employeePunchRepositoryService.saveToLocal();
          })
        }
      });
    })
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.employeeForm.reset();
    this.router.navigate(['/employees']);
  }

  public employeeList(): void {
    this.router.navigate(['/employees'])
  }

  public employeePunch(employeeId: number): void {
    this.router.navigate(['/employeepunches', employeeId])
  }
}