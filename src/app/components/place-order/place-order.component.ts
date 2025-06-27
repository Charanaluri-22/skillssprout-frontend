import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { OrderService } from 'src/app/services/order.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import {Modal} from 'bootstrap';
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  totalAmount: number;
  cartItems: any[];
  userId: number;
  customer: Customer;
  email: string;

  constructor(
    private readonly router: Router,
    private readonly checkoutService: CheckoutService,
    private readonly userStore: UserStoreService,
    private readonly orderService: OrderService,
    private readonly cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartItems = this.checkoutService.getCartItems();
    this.totalAmount = this.checkoutService.getTotalAmount();
    this.customer = this.checkoutService.getCustomer();

    this.userStore.getUser().subscribe(user => {
      if (user) {
        this.userId = +user.userId;
        this.email = user.email;
      }
    });
  }

  makePayment(): void {
    const orderData = {
      orderPrice: this.totalAmount,
      courses: this.cartItems,
      customer: this.customer,
      status: 'pending'
    };

    this.orderService.addOrder(orderData).subscribe(() => {
      this.cartService.clearCart(this.userId).subscribe(() => {
        this.checkoutService.clearData();
        const paymentSuccessModal = new Modal(document.getElementById('paymentSuccessModal'));
        paymentSuccessModal.show();
      });
    });
  }

  redirectToMyOrders(): void {
    this.router.navigate(['/my-orders']);
  }
}
