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

const DEFAULT_APP_CONFIGURATION : AppConfiguration = {
  constants : {
    genericAnimationDurationMS : 100,
    mobileViewThresholdWidthPX : 750,
    progressSpinnerDiameterPX : 80,
    progressSpinnerStrokeWidthPX : 10,
    tooltipHideDelayMS : 0,
    tooltipShowDelayMS : 500
  }
};

const DEFAULT_FIRESTORE_CONNECTION_INFO : string = 'N/A';

const DEFAULT_MAT_DIALOG_CONFIG : MatDialogConfig = {
  autoFocus : true,
  closeOnNavigation : false,
  disableClose : true,
  hasBackdrop : true,
  restoreFocus : true,
  direction : 'ltr',
  panelClass : 'al-dialog',
  role : 'dialog'
};

export {
  APP_CONSTANTS,
  DEFAULT_APP_CONFIGURATION,
  DEFAULT_FIRESTORE_CONNECTION_INFO,
  DEFAULT_MAT_DIALOG_CONFIG
};

export type {
  AppConfiguration
};
