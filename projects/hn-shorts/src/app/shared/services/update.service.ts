import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { concat, filter, first, interval, take } from 'rxjs';
import { DIALOG_CONTENT, DIALOG_TITLE } from '../models/constants';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(
    public appRef: ApplicationRef,
    public updates: SwUpdate,
    private notificationService: NotificationService) {
    this.checkForUpdate();
  }

  private checkForUpdate() {
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);
    everySixHoursOnceAppIsStable$.subscribe(async () => {
      try {
        const updateFound = await this.updates.checkForUpdate();
        console.log(updateFound ? 'A new version is available.' : 'Already on the latest version.');
        if (updateFound) {
          this.updateApp();
        }
      } catch (err) {
        console.error('Failed to check for updates:', err);
      }
    });
  }

  private updateApp() {
    this.updates.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        take(1)
      )
      .subscribe(event => {
        this.promptUser(event);
      });
  }

  private promptUser(event: VersionReadyEvent): void {
    this.notificationService
      .openDialog(DIALOG_TITLE, DIALOG_CONTENT)
      .subscribe(canUpdate => {
        if (canUpdate)
          document.location.reload;
      });
  }
}
