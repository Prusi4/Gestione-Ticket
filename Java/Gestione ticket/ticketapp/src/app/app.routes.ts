import { Routes } from '@angular/router';
import { NewTicketComponent } from './components/new-ticket/new-ticket.component';
import { AsignedTicketComponent } from './components/asigned-ticket/asigned-ticket.component';

import { LoginComponent } from './components/login/login.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { RegisterComponent } from './components/register/register.component';
import { DettaglioTicketComponent } from './components/dettaglio-ticket/dettaglio-ticket.component';
import { ClientTicketComponent } from './components/client-ticket/client-ticket.component';
import { ClientDettaglioTicketComponent } from './components/client-dettaglio-ticket/client-dettaglio-ticket.component';

export const routes: Routes = [
    {path: "", component: LoginComponent},
    {path: "login", component: LoginComponent},
    {path: "newTicket", component: NewTicketComponent},
    {path: "asignedTicket", component: AsignedTicketComponent},
    {path: "ticket", component: TicketComponent},
    {path: "register", component: RegisterComponent},
    {path: "dettaglioTicket/:id", component: DettaglioTicketComponent},
    {path: "clientTicket", component: ClientTicketComponent},
    {path: "clientDettaglioTicket/:id", component: ClientDettaglioTicketComponent}
    
];
