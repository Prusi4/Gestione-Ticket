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
import { MatDialog } from '@angular/material/dialog';
import { DettaglioTicket } from '../../models/dettaglio-ticket';
import { DettaglioTicketService } from '../../services/dettaglio-ticket.service';
import { SelectUserDialogComponent } from '../select-user-dialog/select-user-dialog.component';
import { MatTooltip } from '@angular/material/tooltip';
import { CloseDialogComponent } from '../close-dialog/close-dialog.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-client-dettaglioTicket',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    CommonModule,
    MatIconModule,
    FormsModule,
    MatTooltip,
    MatCardModule,
    MatCheckboxModule,
    HttpClientModule],
  templateUrl: './client-dettaglio-ticket.component.html',
  styleUrl: './client-dettaglio-ticket.component.css'
})
export class ClientDettaglioTicketComponent implements AfterViewInit{
  displayedColumns: string[] = [
    'creatoDa',
    'dataCreazioneTicket',
    'inCaricoA',
    'dataCarico',
    'modificatoDa',
    'dataModificazione',
    'chiusoDa',
    'dataChiusura',
    'motivoDiChiusura',
   
  ];
  dataSource: MatTableDataSource<DettaglioTicket>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dettaglioTicketService: DettaglioTicketService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<DettaglioTicket>();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const dettaglioTicketId = +this.route.snapshot.paramMap.get('id')!;
    this.getDettaglioTicketById(dettaglioTicketId);
  }

  getDettaglioTicketById(dettaglioTicketId: number): void {
  this.dettaglioTicketService.getDettaglioTicketById(dettaglioTicketId).subscribe(
    (dettaglioTicket) => {
      if (dettaglioTicket) {
        this.dataSource.data = [dettaglioTicket];
      } else {
        console.error('No data returned for DettaglioTicket');
      }
    },
    (error) => {
      console.error('Error fetching DettaglioTicket', error);
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

  openAssignDialog(dettaglioTicketId: number, ): void {
    const dialogRef = this.dialog.open(SelectUserDialogComponent, {
      width: '250px',
      data: { dettaglioTicketId } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const userId = result.id;
        if (!userId) {
          console.error('User ID is undefined:', result);
          alert('Invalid user selected.');
          return;
        }
        this.dettaglioTicketService.assignUserToDettaglioTicket(dettaglioTicketId, userId).subscribe(
          (response) => {
            //console.log('Ticket assigned successfully:', response);
            this.getDettaglioTicketById(dettaglioTicketId);
          },
          (error) => {
            console.error('Error assigning ticket:', error);
            if (error.status === 400) {
              console.error('Bad Request:', error.error);
              alert('Ticket or User not found. Please check the IDs.');
            } else {
              console.error('Unexpected Error:', error);
              alert('An unexpected error occurred. Please try again later.');
            }
          }
        );
      }
    });
  }

  openCloseDialog(dettaglioTicketId: number): void {
    const dialogRef = this.dialog.open(CloseDialogComponent, {
      width: '250px',
      data: { dettaglioTicketId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.motivoDiChiusura) {
        const motivoDiChiusura = result.motivoDiChiusura;
        this.dettaglioTicketService.updateMotivoDiChiusura(dettaglioTicketId, motivoDiChiusura).subscribe(
          (response) => {
            console.log('Ticket closed successfully:', response);
            this.getDettaglioTicketById(dettaglioTicketId); // Actualiza los detalles del ticket después de cerrarlo
          },
          (error) => {
            console.error('Error closing ticket:', error);
            alert('Error closing ticket. Please try again later.');
          }
        );
      }
    });
  }
}
