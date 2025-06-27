import { Order } from './order.model';

describe('Order Model', () => {

  fit('frontend_order_model_should_create_an_instance', () => {
    // Create a sample user object
    const order: Order = {
      orderPrice: 100
      
    };

    expect(order).toBeTruthy();
    expect(order.orderPrice).toBe(100);
    
  });
});
