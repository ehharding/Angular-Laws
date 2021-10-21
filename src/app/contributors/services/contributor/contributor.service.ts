/*****************************************************************************************************************************************************
 * This service handles the retrieval of contributor-related data.
 ****************************************************************************************************************************************************/

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';

import { Contributor } from '@contributors/services/contributor/contributor.model';

import { ConfigService } from '@core/services/config/config.service';

/* eslint-disable max-len */

@Injectable({ providedIn : 'any' })
export class ContributorService {
  private readonly _allContributors$ : BehaviorSubject<Contributor[]> = new BehaviorSubject<Contributor[]>([] as Contributor[]);
  private readonly _contributorsFetchError$ : BehaviorSubject<HttpErrorResponse | undefined> = new BehaviorSubject<HttpErrorResponse | undefined>(undefined);

  public constructor(private readonly _httpClient : HttpClient) {
    this.fetchAllContributors();
  }

  /**
   * Fetches all contributors from the database and updates the class's data with the new values, or error handles.
   */
  public fetchAllContributors() : void {
    this._httpClient.get<Contributor[]>(ConfigService.appConfiguration.apiServer.paths.contributors.allContributors).pipe(distinctUntilChanged()).subscribe({
      next : (allContributors : Contributor[]) : void => {
        this._allContributors$.next(allContributors);
        this._contributorsFetchError$.next(undefined);
      },
      error : (error : HttpErrorResponse) : void => {
        this._contributorsFetchError$.next(error);
      }
    });
  }

  /* eslint-enable max-len */

  /**
   * Provides a Contributor[]-typed Observable stream for interested subscribers to receive all contributors from the database.
   *
   * @returns a Contributor[]-typed Observable stream. Subscribe to the stream to receive the object type specified asynchronously.
   */
  public getAllContributors() : Observable<Contributor[]> {
    return this._allContributors$.asObservable().pipe(distinctUntilChanged());
  }

  /**
   * Provides a HttpErrorResponse/undefined-typed Observable stream for interested subscribers to receive the latest error, if any, when the HTTP
   * request to retrieve all contributors from the database was made.
   *
   * @returns a HttpErrorResponse/undefined[]-typed Observable stream. Subscribe to the stream to receive the object type specified asynchronously.
   */
  public getContributorsFetchError() : Observable<HttpErrorResponse | undefined> {
    return this._contributorsFetchError$.asObservable().pipe(distinctUntilChanged());
  }
}
