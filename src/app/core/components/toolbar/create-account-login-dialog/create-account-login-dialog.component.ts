import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'pf-create-account-login-dialog',
  styleUrls : ['create-account-login-dialog.component.scss'],
  templateUrl : 'create-account-login-dialog.component.html'
})
export class CreateAccountLoginDialogComponent { }
