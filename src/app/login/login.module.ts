/**
 * This module serves as the repository for all modules and components associated with the "Login" module of the application.
 */

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';

import { LoginRoutingModule } from '@login/login-routing.module';
import { SharedModule } from '@shared/shared.module';

import { LoginComponent } from '@login/login.component';

@NgModule({
  declarations : [LoginComponent],
  imports : [MatSnackBarModule, LoginRoutingModule, SharedModule]
})
export class LoginModule { }
