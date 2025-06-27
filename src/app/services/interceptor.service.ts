import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { UserStoreService } from './user-store.service';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private readonly userStoreService: UserStoreService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.userStoreService.getUser().pipe(
      take(1), // Get the first emitted value and complete the subscription
      switchMap(user => {
        if (user.token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${user.token}`
            }
          });
        }
        return next.handle(request);
      })
    );
  }
}
