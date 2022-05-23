/**
 * This module serves as the repository for all modules and components associated with the "Contributors" module of the application.
 */

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';

import { ContributorsRoutingModule } from '@contributors/contributors-routing.module';
import { SharedModule } from '@shared/shared.module';

import { ContributorService } from '@contributors/services/contributor/contributor.service';

import { ContributorsComponent } from '@contributors/contributors.component';

@NgModule({
  declarations : [ContributorsComponent],
  imports : [MatButtonModule, MatCardModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatTooltipModule, ContributorsRoutingModule, SharedModule],
  providers : [ContributorService]
})
export class ContributorsModule { }
