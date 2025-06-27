import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  course:Course;
  constructor(private readonly router:Router,private readonly actRoute:ActivatedRoute, private readonly courseService:CourseService) { }

  ngOnInit(): void {
      this.actRoute.params.subscribe((params)=>{
        this.courseService.getCourseById(params['courseId']).subscribe((data)=>this.course=data);
      })
  }
  updateCourse(courseId:number){
    this.courseService.updateCourse(courseId,this.course).subscribe(()=>this.router.navigate(["admin/view/courses"]));
  }
  
  cancel(){
    this.router.navigate(['admin/view/courses']);
  }

}
