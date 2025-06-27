import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private cartItems: any[] = [];
  private totalAmount: number = 0;
  private customer:Customer;

  setCartItems(items: any[]): void {
    this.cartItems = items;
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  setTotalAmount(amount: number): void {
    this.totalAmount = amount;
  }

  getTotalAmount(): number {
    return this.totalAmount;
  }

  setCustomer(customer:Customer){
    this.customer = customer;
  }
  getCustomer(){
    return this.customer;
  }

  clearData(): void {
    this.cartItems = [];
    this.totalAmount = 0;
  }
}
