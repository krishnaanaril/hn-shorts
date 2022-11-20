import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { concat, filter, first, interval, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(public appRef: ApplicationRef, public updates: SwUpdate) {    
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
      .subscribe(evt => {
        if (this.promptUser(evt)) {
          // Reload the page to update to the latest version.
          document.location.reload();
        }
      });
  }

  private promptUser(event: VersionReadyEvent): boolean {
    console.log('updating to new version');
    console.log(event);
    return true;
  }
}
