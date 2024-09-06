import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private authenticatedUser: Users | null = null;
  private apiUrl = 'http://localhost:8080/api/users/login';

  constructor(private http: HttpClient, private router: Router) {}

  authenticate(username: string, password: string): Observable<Users | null> {
    if (!username || !password) {
      throw new Error('Username and password cannot be null');
    }
  
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        this.authenticatedUser = response;
        console.log('Authenticated User:', this.authenticatedUser);
      }),
      catchError(error => {
        console.error('Error during authentication:', error);
        return of(null);
      })
    );
  }

  getAuthenticatedUser(): Users | null {
    return this.authenticatedUser;
  }

  logout(): void {
    this.authenticatedUser = null;
  }
}
