import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';

import { ConfigService } from '@core/services/config/config.service';

@Component({
  selector : 'pf-login',
  styleUrls : ['login.component.scss'],
  templateUrl : 'login.component.html',
  changeDetection : ChangeDetectionStrategy.OnPush
})
class LoginComponent implements OnInit {
  public mobileView : boolean = false;

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
}

export {
  LoginComponent
};