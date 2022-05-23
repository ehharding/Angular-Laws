import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ReplaySubject } from 'rxjs';

import { AppRoute } from 'app/app-routing.module';

import { ALL_THEMES, Theme, ThemeBundle } from '@core/services/theme/theme.model';
import { User } from '@core/services/user/user.model';

import { ConfigService } from '@core/services/config/config.service';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'pf-toolbar',
  styleUrls : ['toolbar.component.scss'],
  templateUrl : 'toolbar.component.html'
})
class ToolbarComponent implements OnInit, OnDestroy {
  @Input() public activeTheme : ThemeBundle = ThemeBundle.DeepPurpleAmber;
  @Input() public currentUser : User | null = null;

  @Output() public openAboutDialog : EventEmitter<void> = new EventEmitter<void>();
  @Output() public openSidenav : EventEmitter<void> = new EventEmitter<void>();
  @Output() public setApplicationTheme : EventEmitter<ThemeBundle> = new EventEmitter<ThemeBundle>();

  public mobileView : boolean = false;

  public readonly allThemes : Theme[] = ALL_THEMES;
  public readonly AppRoute = AppRoute;

  private readonly _componentDestroyed$ : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public constructor(private readonly _changeDetectorRef : ChangeDetectorRef, private readonly _dialog : MatDialog) { }

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
  }

  public ngOnDestroy() : void {
    this._componentDestroyed$.next(true);
    this._componentDestroyed$.complete();
  }
}

export {
  ToolbarComponent
};
