/******************************************************************************************************************************************************************************
 * This module serves as the repository for all modules and components associated with the "Login" portion of the application.
 *****************************************************************************************************************************************************************************/

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';

import { LoginRoutingModule } from '@login/login-routing.module';
import { SharedModule } from '@shared/shared.module';

import { LoginComponent } from '@login/login.component';

@NgModule({
  declarations : [LoginComponent],
  imports : [MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, MatSnackBarModule, LoginRoutingModule, SharedModule]
})
export class LoginModule { }
