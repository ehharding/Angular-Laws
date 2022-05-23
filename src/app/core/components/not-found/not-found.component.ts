import { ActivatedRoute, Data } from '@angular/router';
import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

import { ReplaySubject, distinctUntilChanged, takeUntil } from 'rxjs';

import { AppRoute } from 'app/app-routing.module';

import { ConfigService } from '@core/services/config/config.service';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'pf-not-found',
  styleUrls : ['not-found.component.scss'],
  templateUrl : 'not-found.component.html'
})
class NotFoundComponent implements OnInit, OnDestroy {
  public intendedRouteGuesses : string[] = [];
  public mobileView : boolean = false;

  public readonly AppRoute = AppRoute;

  private readonly _componentDestroyed$ : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public constructor(private readonly _activatedRoute : ActivatedRoute, private readonly _clipboard : Clipboard) { }

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

    this._activatedRoute.data.pipe(distinctUntilChanged(), takeUntil(this._componentDestroyed$)).subscribe({
      next : (data : Data) : void => {
        // Retrieve Any Guesses About The Users Intended Route Based On How Far In Length It Differs From Any Existing Top-Level Routes
        const INTENDED_ROUTE_GUESSES : string[] = (data.intendedRouteGuesses as string | undefined)?.split(',') ?? [];

        // If There Are Guesses About The Intended Route, We Add It To The Class Variable For Display
        this.intendedRouteGuesses = INTENDED_ROUTE_GUESSES.map((intendedRouteGuess : string) : string => `/${ intendedRouteGuess }`);
      }
    });
  }

  public ngOnDestroy() : void {
    this._componentDestroyed$.next(true);
    this._componentDestroyed$.complete();
  }

  /**
   * This method copies a given route string to the clipboard.
   *
   * @param route - The string route to copy to the clipboard
   */
  public copyRouteToClipboard(route : string) : void {
    this._clipboard.copy(route);
  }
}

export {
  NotFoundComponent
};
