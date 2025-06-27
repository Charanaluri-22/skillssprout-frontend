import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { Customer } from 'src/app/models/customer.model';
import { Order } from 'src/app/models/order.model';
import { CheckoutService } from 'src/app/services/checkout.service';
import { OrderService } from 'src/app/services/order.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  courses: Course[] = [];
  orders: Order[] = [];
  totalAmount: number = 0;
  userId: number;
  customer: Customer;
  isLoading: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly userStore: UserStoreService,
    private readonly orderService: OrderService,
    private readonly checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.customer = this.checkoutService.getCustomer();
    this.userStore.getUser().subscribe(user => {
      if (user) {
        this.userId = +user.userId;
        this.loadOrders();
      }
    });
  }

  loadOrders(): void {
    this.isLoading = true;
    this.orderService.viewOrderByUserId(this.userId).subscribe(
      (orders) => {
        this.orders = orders;
        this.calculateTotal();
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  calculateTotal(): void {
    this.totalAmount = this.orders.reduce((sum, order) => sum + order.orderPrice, 0);
  }

  addReview(course: Course): void {
    if (this.customer) {
      this.router.navigate(['/addreview', this.customer.customerId], {
        queryParams: {
          courseType: course.courseType,
          courseDetails: course.courseDetails
        }
      });
    } else {
      this.router.navigate(['/addreview', this.userId], {
        queryParams: {
          courseType: course.courseType,
          courseDetails: course.courseDetails
        }
      });
    }
  }
}
