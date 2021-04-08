/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { CONTRIBUTORS, CONTRIBUTORS_ANIMATIONS, Contributor } from '@contributors/contributors.configuration';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'ff-contributors',
  styleUrls : ['contributors.component.scss'],
  templateUrl : 'contributors.component.html',
  animations : CONTRIBUTORS_ANIMATIONS
})
export class ContributorsComponent implements OnInit {
  public readonly contributors : Contributor[] = CONTRIBUTORS;
  public readonly contributorNamesKebab : string[] = [];

  public panelHovered : boolean = false;
  public panelOpen : boolean = false;

  public ngOnInit() : void {
    for (const CONTRIBUTOR of CONTRIBUTORS) {
      // We'll Convert The Contributors Name To Kebab-Case To Match The File Name (i.e. 'Evan Harding' -> evan-harding)
      this.contributorNamesKebab.push(`${ CONTRIBUTOR.firstName } ${ CONTRIBUTOR.lastName }`.toLowerCase().replace(' ', '-'));
    }
  }
}
