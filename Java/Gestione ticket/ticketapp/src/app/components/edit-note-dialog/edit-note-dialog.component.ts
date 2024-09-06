import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-edit-note-dialog',
  standalone: true,
  imports: [  CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule],
    
  templateUrl: './edit-note-dialog.component.html',
  styleUrl: './edit-note-dialog.component.css'
})
export class EditNoteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { note: string }
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