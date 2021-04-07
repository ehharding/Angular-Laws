/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
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
  imports : [
    ContributorsRoutingModule,
    SharedModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class ContributorsModule { }
