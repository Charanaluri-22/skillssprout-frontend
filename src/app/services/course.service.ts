import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { BACKEND_BASE_URL } from '../constant'; 
@Injectable({
  providedIn: 'root'
})
 
export class CourseService {

  constructor(private readonly http:HttpClient) { }
 
  addCourse(courseData:Course):Observable<Course>{
    return this.http.post<Course>(`${BACKEND_BASE_URL}/api/course`,courseData);
  }
 
  viewAllCourses():Observable<Course[]>{
    return this.http.get<Course[]>(`${BACKEND_BASE_URL}/api/course`);
  }
 
  updateCourse(courseId:number,updatedCourse:Course):Observable<Course>{
    return this.http.put<Course>(`${BACKEND_BASE_URL}/api/course/`+courseId,updatedCourse);
  }
 
  deleteCourse(courseId:number):Observable<void>{
    return this.http.delete<void>(`${BACKEND_BASE_URL}/api/course/${courseId}`);
  }
 
  getCourseById(courseId:number):Observable<Course>{
    return this.http.get<Course>(`${BACKEND_BASE_URL}/api/course/courses/`+courseId);
  }
 
}