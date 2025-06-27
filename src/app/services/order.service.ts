import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { BACKEND_BASE_URL } from '../constant';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private readonly http:HttpClient) { }
  addOrder(orderData:any):Observable<any>{
    return this.http.post<Order>(`${BACKEND_BASE_URL}/api/order`,orderData);
  }
  cancelOrder(orderId:any):Observable<any>{
    return this.http.delete<Order>(`${BACKEND_BASE_URL}/api/order`+"/"+orderId);
  }
  viewAllOrders():Observable<any>{
    return this.http.get<Order[]>(`${BACKEND_BASE_URL}/api/order`);
  }
  viewOrderByCustomerId(customerId:number):Observable<any>
  {
      return this.http.get<Order[]>(`${BACKEND_BASE_URL}/api/order/customer`+"/"+customerId);
  }
  viewOrderByUserId(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${BACKEND_BASE_URL}/api/order/customer`+"/"+customerId);
  }

  viewOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${BACKEND_BASE_URL}/api/order`+"/"+orderId);
  }

  deleteOrder(orderId: number): Observable<Order> {
    return this.http.delete<Order>(`${BACKEND_BASE_URL}/api/order`+"/"+orderId);
  }
  updateOrderStatus(orderId: number, status: string): Observable<Order> {
    return this.http.put<Order>(`${BACKEND_BASE_URL}/api/order/${orderId}/status`, status);
  }
  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${BACKEND_BASE_URL}/orders/${orderId}`);
  }
}
