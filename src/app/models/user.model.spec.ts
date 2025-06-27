import { User } from './user.model';

describe('User Model', () => {

  const password = crypto.randomUUID();

  fit('frontend_user_model_should_create_an_instance', () => {
    // Create a sample user object
    const user: User = {
      username: 'Admin',
      email:'admin@gmail.com',
      password:password,
      role:'Admin'
    };

    expect(user).toBeTruthy();
    expect(user.username).toBe('Admin');
    expect(user.email).toBe('admin@gmail.com');
    expect(user.password).toBe(password);
    expect(user.role).toBe('Admin');


  });
});
