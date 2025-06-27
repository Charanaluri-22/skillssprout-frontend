import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACKEND_BASE_URL } from '../constant';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private readonly http: HttpClient) { }

  addReview(review: any):Observable<any>{
    return this.http.post<any>(`${BACKEND_BASE_URL}/api/review`,review);
  }
  getAllReviews(): Observable<any>{
    return this.http.get<any>(`${BACKEND_BASE_URL}/api/review`);
  }
  getReviewById(reviewId: number):Observable<any>{
    return this.http.get<any>(`${BACKEND_BASE_URL}/api/review/${reviewId}`);
  }
  getReviewsByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${BACKEND_BASE_URL}/api/review/user/${userId}`);
  }
  deleteReview(reviewId: number):Observable<any>{
    return this.http.delete<any>(`${BACKEND_BASE_URL}/${reviewId}`);
  }
}
 