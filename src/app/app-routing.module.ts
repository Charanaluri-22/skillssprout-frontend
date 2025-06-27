import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ErrorComponent } from './components/error/error.component';
import { ViewCoursesComponent } from './components/view-courses/view-courses.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { ViewReviewComponent } from './components/view-review/view-review.component';
import { AuthguardGuard } from './components/authguard.guard';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { CustomerViewCoursesComponent } from './components/customer-view-courses/customer-view-courses.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { UserViewReviewsComponent } from './components/user-view-reviews/user-view-reviews.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegistrationComponent},
  {path:'error',component:ErrorComponent},
  {path:'user/view/courses',component:CustomerViewCoursesComponent,canActivate: [AuthguardGuard], data: { role: 'user' }},
  {path: 'editCourse/:courseId',component:EditCourseComponent,canActivate:[AuthguardGuard],data:{role:'admin'}},
  {path:'admin/view/courses',component:ViewCoursesComponent,canActivate:[AuthguardGuard],data:{role:'admin'}},
  {path:'addreview',component:AddReviewComponent,canActivate:[AuthguardGuard],data:{role:'user'}},
  {path: 'my-cart',component:MyCartComponent,canActivate:[AuthguardGuard],data:{role:'user'}},
  {path:'admin/add/course',component:AddCourseComponent,canActivate: [AuthguardGuard], data: { role: 'admin' }},
  {path:'admin/view/reviews',component:ViewReviewComponent,canActivate: [AuthguardGuard], data: { role: 'admin' }},
  {path:'admin/view/orders',component:ViewOrdersComponent,canActivate: [AuthguardGuard], data: { role: 'admin' }},
  {path:'user/view/orders',component:MyOrdersComponent,canActivate:[AuthguardGuard],data:{role:'user'}},
  {path:'payments',component:PlaceOrderComponent,canActivate:[AuthguardGuard],data:{role:'user'}},
  {path:'my-orders',component:MyOrdersComponent,canActivate:[AuthguardGuard],data:{role:'user'}},
  {path:'addreview/:id',component:AddReviewComponent,canActivate:[AuthguardGuard],data:{role:'user'}},
  {path:'admin/view/orders',component:ViewOrdersComponent,canActivate:[AuthguardGuard],data:{role:'admin'}},
  {path:'user/view/reviews',component:UserViewReviewsComponent,canActivate:[AuthguardGuard],data:{role:'user'}},
  {path:'**',component:ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
