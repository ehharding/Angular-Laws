/******************************************************************************************************************************************************************************
 * This module serves as the repository for all modules and components associated with the "Users" portion of the application.
 *****************************************************************************************************************************************************************************/

import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { UsersRoutingModule } from '@users/users-routing.module';

@NgModule({
  imports : [SharedModule, UsersRoutingModule]
})
export class UsersModule { }
