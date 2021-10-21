/*****************************************************************************************************************************************************
 * This file handles navigation for the `Contributors` module. The URLs defined here are children of contributor/.
 ****************************************************************************************************************************************************/

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ContributorsComponent } from '@contributors/contributors.component';

const ROUTES : Routes = [
  { path : '', component : ContributorsComponent }
];

@NgModule({
  exports : [RouterModule],
  imports : [RouterModule.forChild(ROUTES)]
})
export class ContributorsRoutingModule { }
