import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:8080/api/users/registrer'; 


  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo usuario
  registerUser(username: string, password: string): Observable<Users> {
    const credentials = 'utente semplice'; 

    const newUser: Users = {
      id: 0,
      username,
      password,
      credentials
    };

    return this.http.post<Users>(this.apiUrl, newUser);
  }
}
