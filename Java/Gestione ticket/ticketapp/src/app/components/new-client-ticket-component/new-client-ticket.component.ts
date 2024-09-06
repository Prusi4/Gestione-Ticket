import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Ticket } from '../../models/ticket';
import { NewTicketService } from '../../services/new-ticket.service';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { TicketService } from '../../services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-client-ticket',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-client-ticket.component.html',
  styleUrl: './new-client-ticket.component.css',
})
export class NewClientTicketComponent {
  newTicket: Ticket = {
    id: 0,
    richiedente: '',
    oggetto: '',
    testo: '',
    dataCreazioneTicket: new Date ,
    priorita: '',
    applicazioneInteressata: '',
    utenteCreazione: '',
    note: '',
    stato: '',
    dettaglioTicketId: 0,
    dettaglioTicket: {
      id: 0,
      inCaricoA: '',
      dataCarico: new Date,
      modificatoDa: '',
      creatoDa: '',
      dataCreazioneTicket: new Date,
      dataModificazione: new Date,
      chiusoDa: '',
      dataChiusura: new Date,
      motivoChiusura: '',
      user_id: 0,
    },
  };

  constructor(
    private newTicketService: NewTicketService,
    public dialogRef: MatDialogRef<NewClientTicketComponent>,
    private ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  createTicket(): void {
    this.ticketService.createTicket(this.newTicket).subscribe(
      (response) => {
        console.log('Ticket created successfully:', response);
        this.dialogRef.close();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/clientTicket'], { relativeTo: this.route });
        this.ticketService.getTickets().subscribe((tickets) => {
          this.ticketService.updateTickets(tickets);
        });
      },
      (error) => {
        console.error('Error creating ticket:', error);
      }
    );
  }

  createClientTicket(): void {
    this.ticketService.createTicket(this.newTicket).subscribe(
      (response) => {
        console.log('Ticket created successfully:', response);
        this.dialogRef.close();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/clientTicket'], { relativeTo: this.route });
        this.ticketService.getTickets().subscribe((tickets) => {
          this.ticketService.updateTickets(tickets);
        });
      },
      (error) => {
        console.error('Error creating ticket:', error);
      }
    );
  }

}
