/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
 * This file handles navigation for the `Contributors` module. The URLs defined here are children of contributors/.
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
