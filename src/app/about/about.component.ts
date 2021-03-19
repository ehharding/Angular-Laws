/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { CONTRIBUTORS, Contributor } from '@about/about.configuration';

import { ReplaySubject } from 'rxjs';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'ff-about',
  styleUrls : ['about.component.scss'],
  templateUrl : 'about.component.html',
  animations : [
    trigger('openClose', [
      state('closed', style({ opacity : 1 })),
      state('open', style({ opacity : 0 })),
      transition('closed => open', [animate('0.5s')]),
      transition('open => closed', [animate('0.5s')])
    ])
  ]
})
export class AboutComponent implements OnInit, OnDestroy {
  public readonly contributors : Contributor[] = CONTRIBUTORS;
  public readonly contributorNamesKebab : string[] = [];

  public panelOpen : boolean = false;

  private readonly _componentDestroyed$ : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public ngOnInit() : void {
    for (const CONTRIBUTOR of CONTRIBUTORS) {
      // We'll Convert The Contributors Name To Kebab-Case To Match The File Name (i.e. 'Evan Harding' -> evan-harding)
      this.contributorNamesKebab.push(CONTRIBUTOR.name.toLowerCase().replace(' ', '-'));
    }
  }

  public ngOnDestroy() : void {
    this._componentDestroyed$.next(true);
    this._componentDestroyed$.complete();
  }
}
