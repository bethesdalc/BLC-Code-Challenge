import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailComponent } from './employee-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';

describe('EmployeeDetailComponent', () => {
  let component: EmployeeDetailComponent;
  let fixture: ComponentFixture<EmployeeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDetailComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
