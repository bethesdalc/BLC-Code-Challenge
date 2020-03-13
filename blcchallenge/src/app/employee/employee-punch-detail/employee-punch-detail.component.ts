import { Component, OnInit } from '@angular/core';
import { EmployeePunchRepositoryService } from '../../services/employee-punch-repository.service';
import { EmployeeRepositoryService } from '../../services/employee-repository.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployeePunch } from '../models/iEmployeePunch';
import { IEmployee } from '../models/iEmployee';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { DateValidators } from '../../shared/date.validator';


@Component({
  selector: 'app-employee-punch-detail',
  templateUrl: './employee-punch-detail.component.html',
  styleUrls: ['./employee-punch-detail.component.scss']
})

export class EmployeePunchDetailComponent implements OnInit {
  employeePunchForm: FormGroup;
  employeePunch: IEmployeePunch;
  employee: IEmployee;

  latestPreviousEndTime: Date = null;

  employeePunches: IEmployeePunch[];
  filteredEmployeePunches: IEmployeePunch[];

  pageTitle = 'Employee Punch Edit';

  constructor(
    private employeePunchRepositoryService: EmployeePunchRepositoryService,
    private employeeRepositoryService: EmployeeRepositoryService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.setupEmployeePunchForm();

    let id = +this.route.snapshot.paramMap.get('id');
    let employeeid = +this.route.snapshot.paramMap.get('employeeid');

    this.employeeRepositoryService.getById(employeeid).subscribe((employeeData: IEmployee) => {
      this.employee = employeeData;

      this.employeePunchRepositoryService.getById(id).subscribe((punchData: IEmployeePunch) => {
        this.employeePunch = punchData;

        if (id === 0) {
          this.employeePunch.employee = this.employee;
        }

        this.displayEmployeePunch();
      })
    })
  }

  setupEmployeePunchForm(): void {
    //Setup Base Form
    this.employeePunchForm = this.fb.group({
      startTime: [null, Validators.required],
      endTime: [null],
    });

    //Add watch for start time changes and update end time validator
    this.employeePunchForm.get('startTime').valueChanges.subscribe(val => {
      this.setEndTimeValidator(val);
    });
  }

  displayEmployeePunch(): void {
    if (this.employeePunchForm) {
      this.employeePunchForm.reset();
    }

    if (this.employeePunch.id === 0) {
      this.pageTitle = 'Add Employee Punch';
    } else {
      this.pageTitle = `Edit Employee Punch: ${this.employeePunch.id}`;
    }

    // Update the data on the form
    this.employeePunchForm.setValue({
      startTime: this.employeePunch.startTime,
      endTime: this.employeePunch.endTime
    });

    this.setStartTimeValidationDate();
  }

  setStartTimeValidationDate(): void {
    this.employeePunchRepositoryService.getAll().subscribe((data: IEmployeePunch[]) => {

      //Get all punches and filter by current employee.
      this.employeePunches = data;

      //Filter by current employee.
      this.filteredEmployeePunches = this.performEmployeeFilter(this.employeePunch.employee.id);

      // if we have punches to evaluate 
      if (this.filteredEmployeePunches.length > 0) {
        // sort punches by end date
        this.filteredEmployeePunches.sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime());

        // If this is a new punch, get the last punches end time.
        if (this.employeePunch.id === 0 && this.filteredEmployeePunches.length > 0) {
          this.latestPreviousEndTime = this.filteredEmployeePunches[this.filteredEmployeePunches.length - 1].endTime;
        }
        else {
          for (var punch of this.filteredEmployeePunches) {
            // Evaluate punch if not current punch
            if (punch.id != this.employeePunch.id) {
              // Initialize with the first punch not equal to the punch being edited
              if (this.latestPreviousEndTime === null) {
                this.latestPreviousEndTime = punch.endTime;
              }

              // if the end time is greater than the current end time and start time isnt after current punch start time
              if (punch.endTime > this.latestPreviousEndTime && punch.startTime < this.employeePunch.startTime) {
                this.latestPreviousEndTime = punch.endTime;
              }
            }

          }
        }
      }
      this.setStartTimeValidator(this.latestPreviousEndTime);
    })
  }

  setStartTimeValidator(newCheckTime: Date): void {
    const startTimeControl = this.employeePunchForm.get('startTime');
    startTimeControl.setValidators([Validators.required, DateValidators.dateValidate(newCheckTime)]);
    startTimeControl.updateValueAndValidity();
  } 
  
  setEndTimeValidator(newCheckTime: Date): void {
    const endTimeControl = this.employeePunchForm.get('endTime');
    endTimeControl.setValidators(DateValidators.dateValidate(newCheckTime));
    endTimeControl.updateValueAndValidity();
  }

  performEmployeeFilter(id: number): IEmployeePunch[] {
    return this.employeePunches.filter((employeePunch: IEmployeePunch) => employeePunch.employee.id === id && employeePunch.endTime != null);
  }

  public savePunch() {
    if (this.employeePunchForm.valid) {
      if (this.employeePunchForm.dirty) {
        // update the employee object with values from the form
        const empPunch = { ...this.employeePunch, ...this.employeePunchForm.value };

        if (empPunch.id === 0) {
          this.employeePunchRepositoryService.create(empPunch).subscribe((ret) => {
            this.employeePunchRepositoryService.saveToLocal();
            this.onSaveComplete();
          })
        } else {
          this.employeePunchRepositoryService.update(empPunch).subscribe((ret) => {
            this.employeePunchRepositoryService.saveToLocal();
            this.onSaveComplete();
          })
        }
      } else {
        this.onSaveComplete();
      }
    }
  }

  public deletePunch() {
    // Since the employee forms Delete button is not displayed on a new employee, they should never even reach this code.
    // However, still checking just in case it si called from another method in the future.
    if (this.employeePunch.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the employee punch: ${this.employeePunch.id}?`)) {
        this.employeePunchRepositoryService.delete(this.employeePunch.id).subscribe((ret) => {
          this.employeePunchRepositoryService.saveToLocal();
          this.onSaveComplete();
        })
      }
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.employeePunchForm.reset();
    this.router.navigate(['/employees/punches', this.employeePunch.employee.id]);
  }

  public employeeList() {
    this.router.navigate(['/employees']);
  }

  public employeePunchList() {
    this.router.navigate(['/employees/punches', this.employeePunch.employee.id]);
  }
}