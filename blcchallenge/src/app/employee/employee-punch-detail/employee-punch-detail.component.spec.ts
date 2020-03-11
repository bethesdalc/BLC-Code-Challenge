import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePunchDetailComponent } from './employee-punch-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';

describe('EmployeePunchDetailComponent', () => {
  let component: EmployeePunchDetailComponent;
  let fixture: ComponentFixture<EmployeePunchDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePunchDetailComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePunchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
