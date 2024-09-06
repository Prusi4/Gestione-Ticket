import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { DettaglioTicket } from '../models/dettaglio-ticket';


export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class DettaglioTicketService {
 
  private apiUrl = 'http://localhost:8080/api/dettaglioTicket'; 
  private userApiUrl = 'http://localhost:8080/api/dettaglioTicket/admins';

  constructor(private http: HttpClient) { }

  getDettaglioTicketById(id: number): Observable<DettaglioTicket> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<DettaglioTicket>(url);
  }

  assignUserToDettaglioTicket(dettaglioTicketId: number, userId: number): Observable<ApiResponse<DettaglioTicket>> {
    const url = `${this.apiUrl}/${dettaglioTicketId}/assign/${userId}`;
    return this.http.post<ApiResponse<DettaglioTicket>>(url, {});
  }

  getAdmins(): Observable<any[]> {
    return this.http.get<any[]>(this.userApiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    return throwError(errorMessage);
  }

  updateMotivoDiChiusura(dettaglioTicketId: number, motivoDiChiusura: string): Observable<DettaglioTicket> {
    const url = `${this.apiUrl}/${dettaglioTicketId}/motivoDiChiusura`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
   
    return this.http.put<DettaglioTicket>(url, motivoDiChiusura, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }
  

 
}
