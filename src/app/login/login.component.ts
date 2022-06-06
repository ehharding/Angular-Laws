import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ReplaySubject } from 'rxjs';

import { ConfigService } from '@core/services/config/config.service';

@Component({
  selector : 'pf-login',
  changeDetection : ChangeDetectionStrategy.OnPush,
  styleUrls : ['login.component.scss'],
  templateUrl : 'login.component.html'
})
class LoginComponent implements OnInit, OnDestroy {
  public mobileView : boolean = false;

  public loginFormGroup : FormGroup = new FormGroup({
    userName : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });

  private readonly _componentDestroyed$ : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

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

  /**
   * This function logs the user into the application but should only be callable when the status of the login FormGroup is valid. For now, beyond logging the user in, it
   * merely navigates the user back to the home page.
   */
  public login() : void { }
}

export {
  LoginComponent
};
