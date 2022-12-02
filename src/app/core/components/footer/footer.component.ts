import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { ConfigService } from '@core/services/config/config.service';

import packageJSON from '../../../../../package.json'; // eslint-disable-line import/no-relative-parent-imports, node/file-extension-in-import

@Component({
  selector : 'al-footer',
  changeDetection : ChangeDetectionStrategy.OnPush,
  templateUrl : 'footer.component.html',
  styleUrls : ['footer.component.scss']
})
class FooterComponent implements OnInit {
  public mobileView : boolean = false;

  public readonly angularVersion : string = packageJSON.dependencies['@angular/core'];
  public readonly version : string = packageJSON.version;

  /**
   * Executes certain actions whenever the window changes size. In this case, we set a flag that indicates if we should show a mobile-centric view or not.
   *
   * @param $windowResizeEvent - the resize event that triggered the function call (unless we are called when initializing)
   * @param initialize - a flag that indicates we are in startup and should set the mobile view flag after the view is initialized
   */
  @HostListener('window:resize', ['$event.target'])
  private _onResize($windowResizeEvent : typeof window, initialize : boolean = false) : void {
    if (initialize) {
      this.mobileView = window.innerWidth < ConfigService.appConfiguration.constants.mobileViewThresholdWidthPX;
    } else {
      this.mobileView = $windowResizeEvent.innerWidth < ConfigService.appConfiguration.constants.mobileViewThresholdWidthPX;
    }
  }

  public ngOnInit() : void {
    this._onResize(window, true);
  }
}

export {
  FooterComponent
};
