/*****************************************************************************************************************************************************
 * Copyright 2020 Evan H. Harding. All Rights Reserved.
 *
 * This component is always visible and sits at the top of the application, across the entire screen.
 ****************************************************************************************************************************************************/

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'iv-toolbar',
  styleUrls : ['toolbar.component.scss'],
  templateUrl : 'toolbar.component.html'
})
export class ToolbarComponent {
  public readonly applicationTitle : string = '';
  public readonly gitHubURL : string = 'https://github.com/ehharding/Internet-Visualizer';

  // eslint-disable-next-line max-len
  public constructor(private readonly _matIconRegistry : MatIconRegistry, private readonly _domSanitizer : DomSanitizer, private readonly _titleService : Title) {
    this._matIconRegistry.addSvgIcon('github', this._domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/github-logo.svg'));
    this.applicationTitle = this._titleService.getTitle();
  }
}
