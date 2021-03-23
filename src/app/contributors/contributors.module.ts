/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
 * This module serves as the repository for all code related to the `About` page, which holds information contributors the application, what it's for,
 * contributors, etc.
 ****************************************************************************************************************************************************/

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';

import { ContributorsRoutingModule } from '@contributors/contributors-routing.module';
import { SharedModule } from '@shared/shared.module';

import { ContributorsComponent } from '@contributors/contributors.component';

@NgModule({
  declarations : [ContributorsComponent],
  imports : [ContributorsRoutingModule, SharedModule, MatButtonModule, MatCardModule, MatExpansionModule, MatIconModule, MatTooltipModule]
})
export class ContributorsModule { }
