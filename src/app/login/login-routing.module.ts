/**
 * This file handles navigation for the "Login" module. The URLs defined here are children of the "/login" route.
 */

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from '@login/login.component';

const ROUTES : Routes = [
  { path : '', component : LoginComponent }
];

@NgModule({
  exports : [RouterModule],
  imports : [RouterModule.forChild(ROUTES)]
})
class LoginRoutingModule { }

export {
  LoginRoutingModule
};
