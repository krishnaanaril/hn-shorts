import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar, private zone: NgZone) {}

  public open(message: string, action = 'Okay', duration = 5000) {
    this.zone.run(() => {
      this.snackBar.open(message, action, { duration });
    });
  }
}
