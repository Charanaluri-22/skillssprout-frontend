import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { CustomerViewCoursesComponent } from './components/customer-view-courses/customer-view-courses.component';
import { CustomerdashboardComponent } from './components/customerdashboard/customerdashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {ViewCoursesComponent} from './components/view-courses/view-courses.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { ViewReviewComponent } from './components/view-review/view-review.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { FooterComponent } from './components/footer/footer.component';
import { UserViewReviewsComponent } from './components/user-view-reviews/user-view-reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCourseComponent,
    AddReviewComponent,
    CustomerViewCoursesComponent,
    CustomerdashboardComponent,
    DashboardComponent,
    EditCourseComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    MyCartComponent,
    MyOrdersComponent,
    NavbarComponent,
    PlaceOrderComponent,
    RegistrationComponent,
    ViewOrdersComponent,
    ViewReviewComponent,
    ViewCoursesComponent,
    FooterComponent,
    UserViewReviewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
