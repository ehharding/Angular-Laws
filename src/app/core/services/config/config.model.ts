/* eslint-disable @typescript-eslint/no-magic-numbers */

import { MatDialogConfig } from '@angular/material/dialog';

/* EXTERNAL INTERFACE THAT MIMICS FIREBASE CLOUD FIRESTORE STRUCTURE - MODIFY BOTH SIMULTANEOUSLY */
interface AppConfiguration {
  constants : {
    genericAnimationDurationMS : number;
    mobileViewThresholdWidthPX : number;
    progressSpinnerDiameterPX : number;
    progressSpinnerStrokeWidthPX : number;
    tooltipHideDelayMS : number;
    tooltipShowDelayMS : number;
  };
}

interface AppConstants {
  timeConstants : {
    oneSecondMS : number;
  };
}

const APP_CONSTANTS : AppConstants = {
  timeConstants : {
    oneSecondMS : 1000
  }
};

const DEFAULT_MAT_DIALOG_CONFIG : MatDialogConfig = {
  autoFocus : true,
  closeOnNavigation : false,
  disableClose : true,
  hasBackdrop : true,
  restoreFocus : true,
  direction : 'ltr',
  panelClass : 'pf-dialog',
  role : 'dialog'
};

export {
  APP_CONSTANTS,
  DEFAULT_MAT_DIALOG_CONFIG
};

export type {
  AppConfiguration
};
