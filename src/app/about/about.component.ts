/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'ff-about',
  styleUrls : ['about.component.scss'],
  templateUrl : 'about.component.html'
})
export class AboutComponent { }
