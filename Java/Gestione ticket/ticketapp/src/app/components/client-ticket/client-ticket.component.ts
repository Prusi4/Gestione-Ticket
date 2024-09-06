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
import { ClientNavbarComponent } from '../client-navbar/client-navbar.component';

@Component({
  selector: 'app-client-ticket',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ClientNavbarComponent,
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
  templateUrl: './client-ticket.component.html',
  styleUrl: './client-ticket.component.css'
})
export class ClientTicketComponent implements AfterViewInit{

  tickets: Ticket[] = [];
  utenteCreazione: string = '';

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
    private route: ActivatedRoute,
  ) {
    this.dataSource = new MatTableDataSource<Ticket>();
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    const username = localStorage.getItem('username');
    if (username) {
      this.utenteCreazione = username;
      this.getTickets(this.utenteCreazione);
    } else {
      this.errorMessage = 'User not logged in';
      this.router.navigate(['/login']);
    }
  }

  getTickets(utenteCreazione: string): void {
    this.ticketService.getTicketsByUtenteCreazione(utenteCreazione)
      .subscribe(
        tickets => {
          this.dataSource.data = tickets;
        },
        error => {
          console.error('Error fetching tickets', error);
          this.errorMessage = 'Error fetching tickets: ' + error.message;
        }
      );
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewTicketDetails(dettaglio_ticket_id: number): void {
    this.router.navigate(['/clientDettaglioTicket', dettaglio_ticket_id]);
  }

  

}


