/**
 * This service holds the loading state of a given HTTP request instance for use in displaying loading spinners.
 */

import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn : 'root' })
export class SpinnerService {
  public readonly isLoading$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
