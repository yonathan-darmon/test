import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class CreateUserDto {
  Name: string = "";
  Email: string = "";
  Password: string = "";
}
export class LoginDto {
  Email: string = "";
  Password: string = "";
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api/auth'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const log = new LoginDto
    log.Email = email
    log.Password = password
    return this.http.post(`${this.baseUrl}/login`, log);
  }

  register(name: string, email: string, password: string): Observable<any> {
    const log = new CreateUserDto
    log.Email = email
    log.Password = password
    log.Name = name
    return this.http.post(`${this.baseUrl}/register`, log);
  }
}
