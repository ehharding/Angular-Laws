import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

import { ConfigService } from '@core/services/config/config.service';

@Component({
  selector : 'al-toolbar',
  changeDetection : ChangeDetectionStrategy.OnPush,
  template : `
    <mat-toolbar class="justify-content-between" color="primary">
      <ng-container *ngIf="mobileView else desktopView">
        <div>
          <button mat-icon-button (click)="openSidenav.emit()">
            <mat-icon>menu</mat-icon>
          </button>
        </div>

        <div class="text-center w-100">
          <ng-container *ngTemplateOutlet="homeButtonTemplate"></ng-container>
        </div>
      </ng-container>
      
      <ng-template #desktopView>
        <div>
          <ng-container *ngTemplateOutlet="homeButtonTemplate"></ng-container>
        </div>
        
        <div>
          <a mat-button href="https://github.com/ehharding/Angular-Laws" target="_blank">
            <img alt="GitHub Icon" class="al-github-icon me-2" src="../../../../assets/icons/github.svg"/>
            <span>GitHub</span>
          </a>
        </div>
      </ng-template>
    </mat-toolbar>

    <ng-template #homeButtonTemplate>
      <a mat-button href="/" routerLink="/">
        <mat-icon>balance</mat-icon>
        <span>Angular Laws</span>
      </a>
    </ng-template>
  `,
  styles : [``]
})
class ToolbarComponent implements OnInit {
  @Output() public openSidenav : EventEmitter<void> = new EventEmitter<void>();

  public mobileView : boolean = false;

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
  ToolbarComponent
};
