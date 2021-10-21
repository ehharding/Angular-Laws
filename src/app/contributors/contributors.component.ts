import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { APP_CONSTANTS } from '@core/services/config/config.model';
import { CONTRIBUTORS_ANIMATIONS } from '@contributors/contributors.model';
import { Contributor } from '@contributors/services/contributor/contributor.model';

import { ContributorService } from '@contributors/services/contributor/contributor.service';

import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'pf-contributors',
  styleUrls : ['contributors.component.scss'],
  templateUrl : 'contributors.component.html',
  animations : CONTRIBUTORS_ANIMATIONS
})
export class ContributorsComponent implements OnInit, OnDestroy {
  public readonly contributorNamesKebab : string[] = [];

  public panelHovered : boolean = false;
  public panelOpen : boolean = false;

  public allContributors : Contributor[] = [];
  public contributorsFetchError : HttpErrorResponse | undefined = undefined;
  public contributorsFetchErrorInfo : string | undefined = undefined;

  private readonly _componentDestroyed$ : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public constructor(private readonly _changeDetectorRef : ChangeDetectorRef, private readonly _contributorService : ContributorService) { }

  public ngOnInit() : void {
    this._contributorService.getAllContributors().pipe(takeUntil(this._componentDestroyed$)).subscribe({
      next : (allContributors : Contributor[]) : void => {
        this.allContributors = allContributors;
        this.contributorsFetchError = undefined;
        this.contributorsFetchErrorInfo = undefined;

        for (const CONTRIBUTOR of allContributors) {
          // We'll Convert The Contributors Name To Kebab-Case To Match The File Name (e.g. 'Evan Harding' -> evan-harding)
          this.contributorNamesKebab.push(`${ CONTRIBUTOR.firstName } ${ CONTRIBUTOR.lastName }`.toLowerCase().replace(' ', '-'));
        }

        this._changeDetectorRef.markForCheck();
      }
    });

    this._contributorService.getContributorsFetchError().pipe(takeUntil(this._componentDestroyed$)).subscribe({
      next : (contributorsFetchError : HttpErrorResponse | undefined) : void => {
        if (contributorsFetchError) {
          this.contributorsFetchError = contributorsFetchError;
          this.contributorsFetchErrorInfo = `HTTP ${ contributorsFetchError.status }: ${ APP_CONSTANTS.httpResponseCodes[contributorsFetchError.status].httpStatusText }`;
        }

        this._changeDetectorRef.markForCheck();
      }
    });
  }

  public ngOnDestroy() : void {
    this._componentDestroyed$.next(true);
    this._componentDestroyed$.complete();
  }

  /**
   * Triggers a new HTTP request for the retrieval of the list of contributors from the database.
   */
  public fetchAllContributors() : void {
    this._contributorService.fetchAllContributors();
  }
}
