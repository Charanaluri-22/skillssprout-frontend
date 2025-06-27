import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import {Modal} from 'bootstrap';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent implements OnInit {
  courses: Course[] = [];
  courseIdToDelete: number;
  isLoading: boolean = true;

  constructor(private readonly router: Router, private readonly courseService: CourseService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;
    this.courseService.viewAllCourses().subscribe((data) => {
      this.courses = data;
      this.isLoading = false;
    });
  }

  editCourse(courseId: number): void {
    this.router.navigate(['/editCourse', courseId]);
  }

  openDeleteModal(courseId: number): void {
    this.courseIdToDelete = courseId;
    const deleteModal = new Modal(document.getElementById('deleteModal'));
    deleteModal.show();
  }

  confirmDelete(): void {
    this.courseService.deleteCourse(this.courseIdToDelete).subscribe(() => {
      this.loadCourses();
      const deleteModal = Modal.getInstance(document.getElementById('deleteModal'));
      deleteModal.hide();
      const successModal = new Modal(document.getElementById('successModal'));
      successModal.show();
    });
  }
}
