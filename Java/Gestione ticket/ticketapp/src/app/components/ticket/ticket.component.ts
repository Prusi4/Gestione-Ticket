import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket.service';
import { MatDialog } from '@angular/material/dialog';
import { DeletedDialogComponent } from '../deleted-dialog/deleted-dialog.component';
import { CommonModule } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { EditNoteDialogComponent } from '../edit-note-dialog/edit-note-dialog.component';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSortModule,
    MatTooltip,
    MatIconModule,
    FormsModule,
    DateFormatPipe,
    MatCardModule,
    MatCheckboxModule,
    HttpClientModule,],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent implements AfterViewInit{
  displayedColumns: string[] = [
    'position',
    'richiedente',
    'oggetto',
    'testo',
    'priorita',
    'dataCreazioneTicket',
    'applicazioneInteressata',
    'utenteCreazione',
    'note',
    'actions',
    'stato',
    'dettaglio_ticket_id',
  ];
  dataSource: MatTableDataSource<Ticket>;
  errorMessage: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource<Ticket>();
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getTicketData();
    
  }

  getTicketData() {
    this.ticketService.getTickets().subscribe((ticket) => {
      this.dataSource.data = ticket;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewTicketDetails(dettaglio_ticket_id: number): void {
    this.router.navigate(['/dettaglioTicket', dettaglio_ticket_id]);
  }

  openEditDialog(row: Ticket): void {
    const dialogRef = this.dialog.open(EditNoteDialogComponent, {
      width: '400px',
      data: { note: row.note } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ticketService.updateTicketNote(row.id, result.note).subscribe(
          updatedTicket => {
            const index = this.dataSource.data.findIndex(ticket => ticket.id === row.id);
            if (index !== -1) {
              this.dataSource.data[index] = updatedTicket;
              this.dataSource._updateChangeSubscription(); 
            }
          },
          error => {
            console.error('Error updating ticket:', error);
            if (error.status === 400 && error.error === "This ticket doesn't have an user in 'in carico a'") {
              this.errorMessage = 'Este ticket no está asignado a ningún usuario';
            } else {
              this.errorMessage = "This ticket doesn't have a user assigned yet";
            }
          }
        );
      }
    });
  }



}
