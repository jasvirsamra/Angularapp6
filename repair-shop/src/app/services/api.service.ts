import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/api.php';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}?action=getCustomers`);
  }

  addCustomer(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}?action=addCustomer`, data);
  }

  updateCustomer(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}?action=updateCustomer`, data);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?action=deleteCustomer&id=${id}`);
  }
}

