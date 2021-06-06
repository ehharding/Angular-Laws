/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

/* eslint-disable @typescript-eslint/no-magic-numbers */

export interface IAppConfig {
  environment : {
    name : 'development' | 'production';
  };
  apiServer : {
    themes : string;
  };
  constants : {
    genericAnimationDurationMS : number;
    tooltipHideDelayMS : number;
    tooltipShowDelayMS : number;
    touchendHideDelayMS : number;
  };
}

export const DEFAULT_APP_CONFIG : IAppConfig = {
  environment : {
    name : 'development'
  },
  apiServer : {
    themes : 'assets/themes'
  },
  constants : {
    genericAnimationDurationMS : 250,
    tooltipHideDelayMS : 0,
    tooltipShowDelayMS : 500,
    touchendHideDelayMS : 1500
  }
};
