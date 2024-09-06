import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-deleted-dialog',
  standalone: true,
  imports: [MatRadioModule, FormsModule, MatRadioModule,],
  templateUrl: './deleted-dialog.component.html',
  styleUrl: './deleted-dialog.component.css'
})
export class DeletedDialogComponent {
  selectedOption: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DeletedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ticketRichiedente: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(this.selectedOption);
  }

}
