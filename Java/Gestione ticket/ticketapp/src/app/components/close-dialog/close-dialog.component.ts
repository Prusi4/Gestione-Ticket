import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-close-dialog',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule],
  templateUrl: './close-dialog.component.html',
  styleUrl: './close-dialog.component.css'
})
export class CloseDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CloseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { motivoDiChiusura: string }
  ) { }

  onSaveClick(): void {
    // Aquí puedes implementar la lógica para guardar la nota editada
    // Puedes devolver el valor editado al componente principal si es necesario
    this.dialogRef.close(this.data);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
