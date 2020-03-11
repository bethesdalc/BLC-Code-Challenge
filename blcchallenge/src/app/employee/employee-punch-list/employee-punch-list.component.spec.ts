import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePunchListComponent } from './employee-punch-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('EmployeePunchListComponent', () => {
  let component: EmployeePunchListComponent;
  let fixture: ComponentFixture<EmployeePunchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePunchListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePunchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
