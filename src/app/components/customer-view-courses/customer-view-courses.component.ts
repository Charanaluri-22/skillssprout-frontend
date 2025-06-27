import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { CartService } from 'src/app/services/cart.service';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import {Toast} from 'bootstrap';

@Component({
  selector: 'app-customer-view-courses',
  templateUrl: './customer-view-courses.component.html',
  styleUrls: ['./customer-view-courses.component.css']
})
export class CustomerViewCoursesComponent implements OnInit {
  cartMessage: any;
  courses: any[] = [];
  customer: Customer = null;
  userId: number;
  isLoading: boolean = false;
  showMessage:boolean=false;

  constructor(
    private readonly service: CourseService,
    private readonly cartService: CartService,
    private readonly customerService: CustomerService,
    private readonly userStoreService: UserStoreService,
    private readonly checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.userStoreService.getUser().subscribe((user) => {
      this.userId = +user.userId;
      // Fetch customer details after userId is set
      this.customerService.ViewCustomerByUserId(this.userId).subscribe((data) => {
        this.customer = { ...data };
        this.checkoutService.setCustomer(this.customer);
      });

      this.getAllCourses();
    });
  }

  getAllCourses(): void {
    this.isLoading = true;
    this.service.viewAllCourses().subscribe((data) => {
      this.courses = data;
      this.isLoading = false;
    });
  }

  addToCart(course: any): void {
    this.cartService.getCartByUserId(this.userId).subscribe((cart) => {
      const updatedCart = {
        cartId: cart.cartId,
        courses: [...cart.courses, course],
        totalAmount: cart.totalAmount + course.coursePrice,
        customer: this.customer
      };
      this.cartService.updateCart(updatedCart.cartId, updatedCart).subscribe(() => {
        this.showToast(`${course.courseDetails} has been added to your cart.`);
      });
    }, (error) => {
      if (error.status === 404) { // if not cart exists then create a new cart
        const newCart = {
          courses: [course],
          totalAmount: course.coursePrice,
          customer: this.customer
        };
        this.cartService.addToCart(newCart).subscribe(() => {
          this.showToast(`${course.courseDetails} has been added to your cart.`);
        });
      } else {
        console.error("Error adding to cart:", error);
      }
    });
  }

  showToast(message: string): void {
    const toastElement = document.getElementById('liveToast');
    if (toastElement) {
      const toast =  new Toast(toastElement);
      const toastBody = toastElement.querySelector('.toast-body');
      if (toastBody) {
        toastBody.textContent = message;
      }
      toast.show();
    }
  }
}
