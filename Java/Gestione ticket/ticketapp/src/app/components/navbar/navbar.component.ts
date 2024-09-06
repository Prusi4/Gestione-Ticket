import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { LoginService } from '../../services/login.service';
import { NewTicketComponent } from '../new-ticket/new-ticket.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,MatTooltip],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
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
    this.dialog.open(NewTicketComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
