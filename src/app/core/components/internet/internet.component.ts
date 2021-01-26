/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
 * This component is always visible and is the starting point for the whole application to the user. My vision for this is for the main screen to
 * have 'bubbles', or areas, of information or content that make up the internet based on activity hits of the subject, with the data fueling such
 * results being based on a Google Analytics or some other backend for now.
 ****************************************************************************************************************************************************/

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'iv-internet',
  styleUrls : ['internet.component.scss'],
  templateUrl : 'internet.component.html'
})
export class InternetComponent {
}
