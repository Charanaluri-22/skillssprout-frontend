import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_BASE_URL } from '../constant';
@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private readonly  http:HttpClient) { }

  registerCustomer(customer:any):Observable<any>{
    return this.http.post<any>(BACKEND_BASE_URL,customer);
  }

  ViewcustomerById(customerId:any):Observable<any>{
    return this.http.get<any>(BACKEND_BASE_URL+"/api/customer"+customerId);
  }

  ViewCustomerByUserId(userId:number):Observable<any>{
    return this.http.get<any>(BACKEND_BASE_URL+"/api/customer/user"+"/"+userId);
  }
  
}
