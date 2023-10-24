import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  private URL = 'http://127.0.0.1:8000/api/'; // URL del servicio web

  constructor(private http: HttpClient) {}

  public login(password: string, email: string): Observable<any> {
    return this.http.post(this.URL + 'login', { password, email });
  }
}
