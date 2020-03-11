import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeePunchListComponent } from './employee-punch-list/employee-punch-list.component';
import { EmployeePunchDetailComponent } from './employee-punch-detail/employee-punch-detail.component';
import { EmployeeDetailGuard } from './employee-detail/employee-detail.guard';
import { EmployeePunchListGuard } from './employee-punch-list/employee-punch-list.guard';
import { EmployeePunchDetailGuard } from './employee-punch-detail/employee-punch-detail.guard';

const routes: Routes = [
  {path: 'employees', component: EmployeeListComponent},
  {path: 'employees/:id/edit', canActivate: [EmployeeDetailGuard], component: EmployeeDetailComponent},
  {path: 'employees/punches/:employeeId', canActivate: [EmployeePunchListGuard], component: EmployeePunchListComponent},
  {path: 'employees/punches/:id/:employeeid/edit', canActivate: [EmployeePunchDetailGuard],component: EmployeePunchDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
