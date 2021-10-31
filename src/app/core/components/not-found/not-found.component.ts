import { ActivatedRoute, Data } from '@angular/router';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

import { ReplaySubject, distinctUntilChanged, takeUntil } from 'rxjs';

import { AppRoute } from 'app/app-routing.module';
import { WINDOW_INJECTION_TOKEN } from 'app/app.module';

import { HttpResponseType } from '@core/services/config/config.model';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'pf-not-found',
  styleUrls : ['not-found.component.scss'],
  templateUrl : 'not-found.component.html'
})
export class NotFoundComponent implements OnInit, OnDestroy {
  public hostname : string = 'localhost';
  public possibleIntendedRoutes : string[] = [];

  public readonly AppRoute = AppRoute;
  public readonly HttpResponseType = HttpResponseType;

  private readonly _componentDestroyed$ : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public constructor(
    @Inject(WINDOW_INJECTION_TOKEN) private readonly _window : Window,
    private readonly _activatedRoute : ActivatedRoute,
    private readonly _clipboard : Clipboard
  ) { }

  public ngOnInit() : void {
    this._activatedRoute.data.pipe(distinctUntilChanged(), takeUntil(this._componentDestroyed$)).subscribe({
      next : (data : Data) : void => {
        // Retrieve Any Guesses As To The Users Intended Route Based On How Far In Length It Differs From Any Existing Top-Level Routes
        const POSSIBLE_INTENDED_ROUTES : string[] | undefined = (data.possibleIntendedRoutes as string | null)?.split(',');

        // If There Are Guesses As To The Intended Route, We Add It To The Class Variable For Display
        if (POSSIBLE_INTENDED_ROUTES) {
          this.possibleIntendedRoutes = POSSIBLE_INTENDED_ROUTES;
        }
      }
    });

    this.hostname = this.getHostname();
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
    this._clipboard.copy(`/${ route }`);
  }

  /**
   * This method returns the application hostname.
   *
   * @returns The hostname of the application
   */
  public getHostname() : string {
    return this._window.location.hostname;
  }
}
