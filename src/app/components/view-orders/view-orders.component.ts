import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
  orders: Order[]= [];
  isLoading:boolean = false;
  constructor(private readonly orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(){
    this.isLoading=true;
    this.orderService.viewAllOrders().subscribe((data)=>{
      this.orders=data;
      this.isLoading=false;
    })
  }
  calculateTotalPrices() {
    this.orders.forEach(order => {
      order.orderPrice = order.courses.reduce((sum, course) => sum + course.coursePrice, 0);
    });
  }
  updateOrderStatus(orderId: number, status: string) {
    this.orderService.updateOrderStatus(orderId, status).subscribe((updatedOrder) => {
      this.orders = this.orders.map(order => order.orderId === orderId ? updatedOrder : order);
    });
  } 
}
