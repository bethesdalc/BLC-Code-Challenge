import { Component, OnInit } from '@angular/core';
import { EmployeePunchRepositoryService } from '../../services/employee-punch-repository.service';
import { EmployeeRepositoryService } from '../../services/employee-repository.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployeePunch } from '../models/iEmployeePunch';
import { IEmployee } from '../models/iEmployee';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { DateValidators } from '../../shared/date.validator';

@Component({
  selector: 'app-employee-punch-detail',
  templateUrl: './employee-punch-detail.component.html',
  styleUrls: ['./employee-punch-detail.component.scss']
})

export class EmployeePunchDetailComponent implements OnInit {
  employeePunchForm: FormGroup;
  employeePunch: IEmployeePunch;

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

    if (id === 0) {
      this.getNewEmployeePunch(id, employeeid);
      // For new punches we set the start time validation date/time of the latest end punch time
      // For existing punches, we cannot set this validation. It would prevent updating the start time on any 
      // older punches.  
      // TODO: Discuss how to handle editing a previous punch after a later punch has been entered.  
      this.setStartTimeValidationDate(id, employeeid);
    } 
    else {
      this.getExistingEmployeePunch(id);
    }
  }

  getExistingEmployeePunch(id: number): void {
    this.employeePunchRepositoryService.getById(id).subscribe((data: IEmployeePunch) => {
      this.employeePunch = data;
      this.displayEmployeePunch(data);
    })
  }

  getNewEmployeePunch(id: number, employeeid: number): void {
    this.employeeRepositoryService.getById(employeeid).subscribe((data: IEmployee) => {
      var employee = data;
      this.employeePunchRepositoryService.getById(id).subscribe((data: IEmployeePunch) => {
        data.employee = employee;
        this.displayEmployeePunch(data);
      })
    })
  }

  setStartTimeValidationDate(id :number, employeeid: number): void {
    this.employeePunchRepositoryService.getAll().subscribe((data: IEmployeePunch[]) => {
      //Get all punches and filter by current employee.
      this.employeePunches = data;
      this.filteredEmployeePunches = this.performEmployeeFilter(employeeid);

      // Set the latestPunch time by 
      var latestPunchTime: Date = null;

      // Loop through all employee punches to determine the latest end time entered
      // If a punch time is null, do not evaluate that punch.  this shouldnt happen as we should not 
      // be able to create a punch if there are any punches with an end time null
      
      for (var punch of this.filteredEmployeePunches) {
        if (punch.endTime != null) {
          if (latestPunchTime) {
            if (punch.endTime > latestPunchTime) {
              latestPunchTime = punch.endTime;
            }
          }
          else {
            latestPunchTime = punch.endTime;
          }
        }
      }

      //Convert for the dateValidator
      latestPunchTime = new Date(latestPunchTime);
      this.setStartTimeValidator(latestPunchTime);
    })
  }

  setupEmployeePunchForm(): void {
    //Setup Base Form
    this.employeePunchForm = this.fb.group({
      startTime: ['', Validators.required],
      endTime: [''],
    });

    //Add watch for start time changes and update end time validator
    this.employeePunchForm.get('startTime').valueChanges.subscribe(val => {
      this.setEndTimeValidator(val);
    });
  }

  setStartTimeValidator(newCheckTime: Date): void {
    const startTimeControl = this.employeePunchForm.get('StartTime');
    startTimeControl.setValidators([Validators.required, DateValidators.dateValidate(newCheckTime)]);
    startTimeControl.updateValueAndValidity();
  }

  setEndTimeValidator(newCheckTime: Date): void {
    const endTimeControl = this.employeePunchForm.get('endTime');
    endTimeControl.setValidators(DateValidators.dateValidate(newCheckTime));
    endTimeControl.updateValueAndValidity();
  }

  performEmployeeFilter(id: number): IEmployeePunch[] {
    return this.employeePunches.filter((employeePunch: IEmployeePunch) => employeePunch.employee.id === id);
  }

  displayEmployeePunch(employeePunch: IEmployeePunch): void {
    if (this.employeePunchForm) {
      this.employeePunchForm.reset();
    }
    this.employeePunch = employeePunch;

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