import { Cart } from './cart.model';

describe('Cart Model', () => {

  fit('frontend_cart_model_should_create_an_instance', () => {
    // Create a sample user object
    const cart: Cart = {
      cartId: 1,
      totalAmount:100
    };

    expect(cart).toBeTruthy();
    expect(cart.cartId).toBe(1);
    expect(cart.totalAmount).toBe(100);

  });
});
