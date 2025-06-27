import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  userId: string;
  role: string;
  token: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private readonly user = new BehaviorSubject<User>(this.getUserFromLocalStorage());

  constructor() {}

  setUser(user: Partial<User>) {
    const currentUser = this.user.getValue();
    const updatedUser = { ...currentUser, ...user };
    this.user.next(updatedUser);
    this.setUserToLocalStorage(updatedUser);
  }

  getUser() {
    return this.user.asObservable();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  private deleteUserFromLocalStorage(){
    localStorage.clear();
  }

  private getUserFromLocalStorage(): User {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : { userId: null, role: null, token: null, email: null };
  }
  isLoggedIn(): boolean {
    return !!this.user;
  }
  logout():any{
    this.deleteUserFromLocalStorage();
  }
}

