import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ReplaySubject, takeUntil } from 'rxjs';

import { User } from '@core/services/user/user.model';

import { UserService } from '@core/services/user/user.service';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'pf-login',
  styleUrls : ['login.component.scss'],
  templateUrl : 'login.component.html'
})
export class LoginComponent implements OnDestroy {
  public loginFormGroup : FormGroup = new FormGroup({
    userName : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });

  private readonly _componentDestroyed$ : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public constructor(private readonly _router : Router, private readonly _userService : UserService) { }

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
        await this._router.navigate(['']);
      },
      error(_errorResponse : HttpErrorResponse) : void { }
    });
  }
}
