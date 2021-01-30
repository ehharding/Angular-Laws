/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

export enum ThemeBundles {
  DeepPurpleAmber = 'deeppurple-amber',
  IndigoPink = 'indigo-pink',
  PinkBlueGrey = 'pink-bluegrey',
  PurpleGreen = 'purple-green'
}

export enum ThemeCSSClassNames {
  DeepPurpleAmber = 'iv-deeppurple-amber',
  IndigoPink = 'iv-indigo-pink',
  PinkBlueGrey = 'iv-pink-bluegrey',
  PurpleGreen = 'iv-purple-green'
}

export interface Theme {
  bundleName : ThemeBundles;
  labelName : string;
  backgroundColor : string;
  buttonColor : string;
  headerColor : string;
}

export const AVAILABLE_THEMES : Theme[] = [
  { bundleName : ThemeBundles.DeepPurpleAmber, labelName : 'Deep Purple & Amber', backgroundColor : '#FFFFFF', buttonColor : '#FFC107', headerColor : '#673AB7' },
  { bundleName : ThemeBundles.IndigoPink, labelName : 'Indigo & Pink', backgroundColor : '#FFFFFF', buttonColor : '#FF4081', headerColor : '#3F51B5' },
  { bundleName : ThemeBundles.PinkBlueGrey, labelName : 'Pink & Blue Grey', backgroundColor : '#303030', buttonColor : '#607D8B', headerColor : '#E91E63' },
  { bundleName : ThemeBundles.PurpleGreen, labelName : 'Purple & Green', backgroundColor : '#303030', buttonColor : '#4CAF50', headerColor : '#9C27B0' }
];
