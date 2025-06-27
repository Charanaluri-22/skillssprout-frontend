import { Customer } from './customer.model';

describe('User Model', () => {

  fit('frontend_customer_model_should_create_an_instance', () => {
    // Create a sample user object
    const customer: Customer = {
      customerName: 'sampleName',
    };

    expect(customer).toBeTruthy();
    expect(customer.customerName).toBe('sampleName');
  });
});
