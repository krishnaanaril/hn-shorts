import { Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar, private zone: NgZone, public dialog: MatDialog) {}

  public openSnackBar(message: string, action = 'Okay', duration = 5000) {
    this.zone.run(() => {
      this.snackBar.open(message, action, { duration });
    });
  }

  public openDialog(dialogTitle: string, dialogContent: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: dialogTitle, content: dialogContent},
      disableClose: true
    });
    return dialogRef.afterClosed();
  }
}
