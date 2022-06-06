import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';

import { ReplaySubject, takeUntil } from 'rxjs';

import { AppRoute } from 'app/app-routing.module';

import { Contributor } from '@contributors/services/contributor/contributor.model';

import { ConfigService } from '@core/services/config/config.service';
import { ContributorService } from '@contributors/services/contributor/contributor.service';

@Component({
  selector : 'pf-contributors',
  changeDetection : ChangeDetectionStrategy.OnPush,
  styleUrls : ['contributors.component.scss'],
  templateUrl : 'contributors.component.html'
})
class ContributorsComponent implements OnInit, OnDestroy {
  public allContributors : Contributor[] = [];
  public contributorsFetchError : string | undefined = undefined;
  public mobileView : boolean = false;

  public readonly AppRoute = AppRoute;
  public readonly contributorNamesKebab : string[] = [];
  public readonly matTooltipShowDelay : number = ConfigService.appConfiguration.constants.tooltipShowDelayMS;

  private readonly _componentDestroyed$ : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public constructor(private readonly _changeDetectorRef : ChangeDetectorRef, private readonly _contributorService : ContributorService) { }

  /**
   * Executes certain actions whenever the window changes size. In this case, we set a flag that indicates if we should show a mobile-centric view or not.
   *
   * @param $windowResizeEvent - the resize event that triggered the function call (unless we are called when initializing)
   * @param initialize - a flag that indicates we are in startup and should set the mobile view flag after the view is initialized
   */
  @HostListener('window:resize', ['$event.target'])
  private _onResize($windowResizeEvent : typeof window, initialize : boolean = false) : void {
    if (initialize) {
      this.mobileView = window.innerWidth < ConfigService.appConfiguration.constants.mobileViewThresholdWidthPX;
    } else {
      this.mobileView = $windowResizeEvent.innerWidth < ConfigService.appConfiguration.constants.mobileViewThresholdWidthPX;
    }
  }

  public ngOnInit() : void {
    this._onResize(window, true);

    this._contributorService.getAllContributors$().pipe(takeUntil(this._componentDestroyed$)).subscribe({
      next : (allContributors : Contributor[]) : void => {
        this.allContributors = allContributors;
        this.contributorsFetchError = undefined;

        for (const CONTRIBUTOR of allContributors) {
          // We'll Convert The Contributors Name To Kebab-Case To Match The File Name (e.g., 'Evan Harding' -> evan-harding)
          this.contributorNamesKebab.push(`${ CONTRIBUTOR.firstName } ${ CONTRIBUTOR.lastName }`.toLowerCase().replace(' ', '-'));
        }

        this._changeDetectorRef.detectChanges();
      }
    });

    this._contributorService.getContributorsFetchError$().pipe(takeUntil(this._componentDestroyed$)).subscribe({
      next : (contributorsFetchError : string | undefined) : void => {
        if (contributorsFetchError) {
          this.contributorsFetchError = contributorsFetchError;
        }

        this._changeDetectorRef.detectChanges();
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

  public getUserNameFromUserId(userId : number) : string {
    return String(userId);
  }
}

export {
  ContributorsComponent
};
