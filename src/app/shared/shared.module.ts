/**
 * This module contains all commonly used components, directives, modules, and pipes that are used across the application.
 *
 * {@link https://angular.io/guide/sharing-ngmodules#sharing-modules | Angular Sharing Modules Guide}
 */

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  exports : [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule,
    ScrollingModule
  ]
})
class SharedModule { }

export {
  SharedModule
};
