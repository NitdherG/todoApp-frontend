import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialog = inject(MatDialog);
  openedDialog: MatDialogRef<any> | undefined;

  openDialog(component: any, data: object): MatDialogRef<any> {
    const dialogRef = this.dialog.open(component, {
      data: data,
    });

    this.openedDialog = dialogRef;
    return dialogRef;
  }
}
