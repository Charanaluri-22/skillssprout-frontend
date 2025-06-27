import { Login } from './login.model';

describe('Login Model', () => {

  const password = crypto.randomUUID();

  fit('frontend_Login_model_should_create_an_instance', () => {
    // Create a sample Login object
    const login: Login = {
      email: 'user@example.com',
      password: password
    };

    expect(login).toBeTruthy();
    expect(login.email).toBe('user@example.com');
    expect(login.password).toBe(password);
  });

});
