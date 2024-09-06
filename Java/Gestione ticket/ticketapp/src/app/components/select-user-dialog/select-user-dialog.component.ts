import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { DettaglioTicketService } from '../../services/dettaglio-ticket.service';

@Component({
  selector: 'app-select-user-dialog',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './select-user-dialog.component.html',
  styleUrls: ['./select-user-dialog.component.css'],
})
export class SelectUserDialogComponent implements OnInit {
  users: any[] = [];

  dettaglioTicketId: number;

  constructor(
    public dialogRef: MatDialogRef<SelectUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dettaglioTicketService: DettaglioTicketService
  ) {
    
    this.dettaglioTicketId = data.dettaglioTicketId;
  }

  ngOnInit(): void {
    this.dettaglioTicketService.getAdmins().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  selectUser(user: any): void {
    // Verifica si el usuario tiene una propiedad id válida
    if (!user || !user.id) {
      console.error('Invalid user object or missing user ID:', user);
      alert('Please select a valid user.');
      return;
    }

    // Asigna el usuario al dettaglio ticket
    this.dettaglioTicketService.assignUserToDettaglioTicket(this.data.dettaglioTicketId, user.id).subscribe(
      (response) => {
        console.log('Ticket assigned successfully:', response);
        this.dialogRef.close(user); 
      },
      (error) => {
        console.error('Error assigning ticket:', error);
        if (error.status === 400) {
          console.error('Bad Request:', error.error);
          alert('Error: Bad Request. Please check the data sent.');
        } else {
          console.error('Unexpected Error:', error);
          alert('An unexpected error occurred. Please try again later.');
        }
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
