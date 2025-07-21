import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5000/api/users';

  constructor( private http:HttpClient) { }
  createUser(data: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, data);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  downloadPDF(id: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/pdf/${id}`, { responseType: 'blob' });
  }
  
}
