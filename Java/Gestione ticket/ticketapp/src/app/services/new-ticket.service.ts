import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewTicketService {
  private apiUrl = 'http://localhost:8080/api/tickets';

  constructor(private http: HttpClient) {}

  createTicket(ticket: Ticket): Observable<Ticket> {
    ticket.stato = 'aperto';
    ticket.priorita = 'media';
    ticket.dataCreazioneTicket = new Date();
    ticket.dettaglioTicket.creatoDa = ticket.richiedente;
    ticket.dettaglioTicket.dataCreazioneTicket = ticket.dataCreazioneTicket;

    return this.http.post<Ticket>(this.apiUrl, ticket);
  }
}
