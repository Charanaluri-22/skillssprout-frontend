import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACKEND_BASE_URL } from '../constant';
import { Cart } from 'src/app/models/cart.model'; // Ensure you have a Cart model defined

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private readonly http: HttpClient) {}

    addToCart(newCart: Cart): Observable<Cart> {
    return this.http.post<Cart>(`${BACKEND_BASE_URL}/api/cart`, newCart);
  }

   updateCart(cartId: number, updatedCart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${BACKEND_BASE_URL}/api/cart/${cartId}`, updatedCart);
  }

    removeCourseFromCart(cartId: number, courseId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${BACKEND_BASE_URL}/api/cart/${cartId}/course/${courseId}`);
  }

   getCartByUserId(userId: number): Observable<Cart> {
    return this.http.get<Cart>(`${BACKEND_BASE_URL}/api/cart/user/${userId}`);
  }

    getCartByCustomerId(customerId: number): Observable<Cart> {
    return this.http.get<Cart>(`${BACKEND_BASE_URL}/api/cart/customer/${customerId}`);
  }

    getAllCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${BACKEND_BASE_URL}/api/cart`);
  }
  clearCart(userId: number): Observable<void> {
    return this.http.delete<void>(`${BACKEND_BASE_URL}/api/cart/clear/${userId}`);
  }
  
}

