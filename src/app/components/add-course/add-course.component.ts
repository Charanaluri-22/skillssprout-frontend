import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import {Modal} from 'bootstrap';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  addForm: FormGroup;
  courses: Course;

  constructor(private readonly formBuilder: FormBuilder, private readonly courseService: CourseService, private readonly router: Router) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      courseType: ['', [Validators.required]],
      courseImageUrl: ['', [Validators.required, Validators.pattern('(https?:\\/\\/.*)')]],
      courseDetails: ['', [Validators.required, Validators.maxLength(125), Validators.minLength(5)]],
      coursePrice: ['', [Validators.required]]
    });
  }

  addCourse() {
    if (this.addForm.valid) {
      this.courseService.addCourse(this.addForm.value).subscribe(() => {
        const modal = new Modal(document.getElementById('courseAddedModal'));
        modal.show();
        this.addForm.reset();
        this.router.navigate(['/admin/view/courses']);
      });
    } else {
      console.error("*All the fields are required");
    }
  }

  get f() {
    return this.addForm.controls;
  }
}
