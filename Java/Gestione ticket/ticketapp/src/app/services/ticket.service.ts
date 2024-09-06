  import { Injectable } from '@angular/core';
  import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
  import { Ticket } from '../models/ticket';
  import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

  @Injectable({
    providedIn: 'root'
  })
  export class TicketService {
    getDettaglioTicket() {
      throw new Error('Method not implemented.');
    }
    private apiUrl = 'http://localhost:8080/api/tickets';

    private ticketsSubject = new BehaviorSubject<Ticket[]>([]);
    tickets$ = this.ticketsSubject.asObservable();


    constructor(private http: HttpClient) {}

    getTickets(): Observable<Ticket[]> {
      return this.http.get<Ticket[]>(this.apiUrl).pipe(
        catchError(this.handleError)
      );
    }

    getTicketsByUtenteCreazione(utenteCreazione: string): Observable<Ticket[]> {
      return this.http.get<Ticket[]>(`${this.apiUrl}/user/${utenteCreazione}`).pipe(
        catchError(this.handleError)
      );
    }
  

    getTicketById(id: number): Observable<Ticket> {
      return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
    }

    /*deleteTicket(id: number): Observable<string> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete(url, { responseType: 'text' }).pipe(
        catchError(this.handleError)
      );
    }*/

    createTicket(ticket: Ticket): Observable<Ticket> {
      ticket.dataCreazioneTicket = new Date();
      return this.http.post<Ticket>(this.apiUrl, ticket).pipe(
        
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

    getTicketsSubject(): Observable<Ticket[]> {
      return this.ticketsSubject.asObservable();
    }

    updateTickets(tickets: Ticket[]): void {
      this.ticketsSubject.next(tickets);
    }

    updateTicketNote(id: number, note: string): Observable<Ticket> {
      const url = `${this.apiUrl}/${id}/note`;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
      return this.http.put<Ticket>(url, note, { headers: headers }).pipe(
        catchError(this.handleError)
      );
    }
  
  }