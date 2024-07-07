import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private reqCount = 0;
  private loaderSubj$ = new BehaviorSubject<boolean>(false);

  public loading$ = this.loaderSubj$.asObservable();

  public hideLoader() {
    this.reqCount--;
    if (!this.reqCount) this.loaderSubj$.next(false);
  }

  public showLoader() {
    this.reqCount++;
    if (this.reqCount) this.loaderSubj$.next(true);
  }
}
