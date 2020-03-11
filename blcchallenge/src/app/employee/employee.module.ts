import { NgModule } from '@angular/core';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeePunchListComponent } from './employee-punch-list/employee-punch-list.component';
import { EmployeePunchDetailComponent } from './employee-punch-detail/employee-punch-detail.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeRoutingModule } from './employee-routing.module';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailComponent,
    EmployeePunchListComponent,
    EmployeePunchDetailComponent,
  ],
  imports: [
    SharedModule,
    EmployeeRoutingModule,
  ]
})
export class EmployeeModule { }
