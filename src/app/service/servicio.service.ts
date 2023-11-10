import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  private URL = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<any>(`${this.URL}login`, credentials);
  }
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.URL}users`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.URL}users/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.URL}users`, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.URL}users/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.URL}users/${id}`);
  }

  createRol(nombre: string): Observable<any> {
    return this.http.post(this.URL + 'roles', { nombre });
  }
  getRoles(): Observable<any> {
    const endpoint = `${this.URL}roles`; // Reemplaza 'roles' con la ruta correcta de tu API
    return this.http.get<any>(endpoint);
  }
  deleteRol(id: number): Observable<any> {
    return this.http.delete(`${this.URL}roles/${id}`);
  }
}
