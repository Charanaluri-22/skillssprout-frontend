import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/services/user-store.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';
  role: string = '';
  navItems: any[] = [];
  modalInstance: Modal | null = null;

  constructor(private readonly userStore: UserStoreService, private readonly router: Router) {}

  ngOnInit(): void {
    this.userStore.getUser().subscribe(user => {
      if (user.email) {
        this.isLoggedIn = true;
        this.username = user.email;
        this.role = user.role;
        this.setNavItems(this.role);
      }
    });
  }

  ngAfterViewInit(): void {
    const logoutModalElement = document.getElementById('logoutModal');
    if (logoutModalElement) {
      this.modalInstance = new Modal(logoutModalElement);
    }
  }

  setNavItems(role: string) {
    if (role.toLowerCase() === 'admin') {
      this.navItems = [
        { label: 'Add Course', route: '/admin/add/course' },
        { label: 'View Courses', route: '/admin/view/courses' },
        { label: 'View Review', route: '/admin/view/reviews' },
        { label: 'View Orders', route: 'admin/view/orders' }
      ];
    } else if (role.toLowerCase() === 'user') {
      this.navItems = [
        { label: 'View Courses', route: '/user/view/courses' },
        { label: 'My Cart', route: 'my-cart' },
        { label: 'My Orders', route: 'user/view/orders' },
        {label:'My Reviews',route:'user/view/reviews'}
      ];
    }
  }

  openLogoutModal() {
    this.modalInstance?.show();
  }

  confirmLogout() {
    this.userStore.logout();
    this.isLoggedIn = false;
    this.username = '';
    this.role = '';
    this.navItems = [];
    this.router.navigate(['/login']);
    this.modalInstance?.hide();
  }
}
