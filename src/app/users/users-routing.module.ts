/******************************************************************************************************************************************************************************
 * This file handles navigation for the "Users" module. The URLs defined here are children of the "/users" route.
 *****************************************************************************************************************************************************************************/

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const ROUTES : Routes = [];

@NgModule({
  exports : [RouterModule],
  imports : [RouterModule.forChild(ROUTES)]
})
export class UsersRoutingModule { }
