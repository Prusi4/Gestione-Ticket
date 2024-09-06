import { DettaglioTicket } from "./dettaglio-ticket";

export interface Ticket {
    id: number;
    richiedente: string;
    oggetto: string;
    testo: string;
    dataCreazioneTicket: Date ;
    priorita: string;
    applicazioneInteressata: string;
    utenteCreazione: string;
    note: string;
    stato: string;
    dettaglioTicket: DettaglioTicket;
    dettaglioTicketId: number;

}
