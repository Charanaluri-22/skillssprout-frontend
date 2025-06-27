import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerViewCoursesComponent } from './customer-view-courses.component';

describe('CustomerViewCoursesComponent', () => {
  let component: CustomerViewCoursesComponent;
  let fixture: ComponentFixture<CustomerViewCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerViewCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerViewCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
