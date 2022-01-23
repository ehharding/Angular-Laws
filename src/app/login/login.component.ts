import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ReplaySubject, takeUntil } from 'rxjs';

import { DEFAULT_MAT_SNACKBAR_CONFIG } from '@core/services/config/config.model';
import { User } from '@core/services/user/user.model';

import { ConfigService } from '@core/services/config/config.service';
import { UserService } from '@core/services/user/user.service';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'pf-login',
  styleUrls : ['login.component.scss'],
  templateUrl : 'login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  public hidePasswordText : boolean = true;
  public loginCardShowing : boolean = true;
  public mobileView : boolean = false;

  public loginFormGroup : FormGroup = new FormGroup({
    userName : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });

  private readonly _componentDestroyed$ : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public constructor(private readonly _router : Router, private readonly _snackBar : MatSnackBar, private readonly _userService : UserService) { }

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
  public login() : void {
    this._userService.login$(this.loginFormGroup.value.userName, this.loginFormGroup.value.password).pipe(takeUntil(this._componentDestroyed$)).subscribe({
      next : async(_user : User) : Promise<void> => {
        this._snackBar.open('Log In Successful', 'OK', DEFAULT_MAT_SNACKBAR_CONFIG);
        await this._router.navigate(['']);
      },
      error : (_errorResponse : HttpErrorResponse) : void => {
        this._snackBar.open('Failed to Log In. Please Try Again.', 'OK', { ...DEFAULT_MAT_SNACKBAR_CONFIG, politeness : 'assertive' });
      }
    });
  }
}
