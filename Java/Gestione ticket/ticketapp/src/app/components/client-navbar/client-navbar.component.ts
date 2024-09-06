import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { LoginService } from '../../services/login.service';
import { NewTicketComponent } from '../new-ticket/new-ticket.component';
import { MatDialog } from '@angular/material/dialog';
import { NewClientTicketComponent } from '../new-client-ticket-component/new-client-ticket.component';

@Component({
  selector: 'app-client-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,MatTooltip],
  templateUrl: './client-navbar.component.html',
  styleUrl: './client-navbar.component.css'
})
export class ClientNavbarComponent implements OnInit {
  currentUsername: string | any; 

  constructor(private router: Router, private loginService: LoginService, public dialog: MatDialog) { }

  ngOnInit(): void {
    const authenticatedUser = this.loginService.getAuthenticatedUser();
    if (authenticatedUser) {
      this.currentUsername = authenticatedUser.username;
    }
  }

  logout(): void {
    this.router.navigate(['/login']); 
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(NewClientTicketComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
