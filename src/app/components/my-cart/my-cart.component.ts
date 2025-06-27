import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  cartItems: any[] = [];
  totalAmount: number = 0;
  cartId: number;

  constructor(
    private readonly cartService: CartService,
    private readonly router: Router,
    private readonly userStore: UserStoreService,
    private readonly checkoutService: CheckoutService
  ) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.userStore.getUser().subscribe(user => {
      if (user?.userId) {
        const id = +user.userId;
        this.cartService.getCartByUserId(id).subscribe((data) => {
          this.cartId = data.cartId;
          this.cartItems = data.courses;
          this.calculateTotal();
        });
      }
    });
  }

  removeFromCart(id: number): void {
    this.cartService.removeCourseFromCart(this.cartId, id).subscribe(() => {
      this.loadCartItems();
    });
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.coursePrice, 0);
  }

  enrollNow(): void {
    this.checkoutService.setCartItems(this.cartItems);
    this.checkoutService.setTotalAmount(this.totalAmount);
    this.router.navigate(['/payments']);
  }
}
