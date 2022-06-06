/**
 * This service handles the retrieval of contributor-related data.
 */

import { Injectable } from '@angular/core';

import { QueryDocumentSnapshot, QuerySnapshot, collection, getDocs } from 'firebase/firestore';

import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';

import { Contributor } from '@contributors/services/contributor/contributor.model';

import { ConfigService } from '@core/services/config/config.service';

@Injectable({ providedIn : 'any' })
class ContributorService {
  private readonly _allContributors$ : BehaviorSubject<Contributor[]> = new BehaviorSubject<Contributor[]>([] as Contributor[]);
  private readonly _contributorsFetchError$ : BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  public constructor() {
    this.fetchAllContributors();
  }

  /**
   * Fetches all contributors from the database and updates the class's data with the new values, or error handles.
   */
  public fetchAllContributors() : void {
    if (ConfigService.firestore) {
      const ALL_CONTRIBUTORS : Contributor[] = [];

      getDocs(collection(ConfigService.firestore, 'contributors')).then((allContributorsSnapshot : QuerySnapshot) : void => {
        allContributorsSnapshot.forEach((contributorSnapshot : QueryDocumentSnapshot) : void => {
          ALL_CONTRIBUTORS.push(contributorSnapshot.data() as Contributor);
          this._allContributors$.next(ALL_CONTRIBUTORS);
        });
      }).catch((error : Error) : void => {
        console.error(error.message);
        this._contributorsFetchError$.next(error.message);
      });
    } else {
      console.error('Firebase Firestore seems to be unavailable.');
    }
  }

  /**
   * Provides a Contributor[]-typed Observable stream for interested subscribers to receive all contributors from the database.
   *
   * @returns a Contributor[]-typed Observable stream. Subscribe to the stream to receive the object type specified asynchronously.
   */
  public getAllContributors$() : Observable<Contributor[]> {
    return this._allContributors$.asObservable().pipe(distinctUntilChanged());
  }

  /**
   * Provides a string | undefined-typed Observable stream for interested subscribers to receive the latest error, if any, associated with a request to retrieve contributors
   * from the database.
   *
   * @returns a string | undefined-typed Observable stream. Subscribe to the stream to receive the object type specified asynchronously.
   */
  public getContributorsFetchError$() : Observable<string | undefined> {
    return this._contributorsFetchError$.asObservable().pipe(distinctUntilChanged());
  }
}

export {
  ContributorService
};
