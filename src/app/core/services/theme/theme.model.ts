enum ThemeBundle {
  DeepPurpleAmber = 'deeppurple-amber',
  IndigoPink = 'indigo-pink',
  PinkBlueGrey = 'pink-bluegrey',
  PurpleGreen = 'purple-green'
}

interface Theme {
  bundleName : ThemeBundle;
  labelName : string;
  backgroundColor : string;
  buttonColor : string;
  headerColor : string;
}

const ALL_THEMES : Theme[] = [
  { bundleName : ThemeBundle.DeepPurpleAmber, labelName : 'Deep Purple & Amber', backgroundColor : '#FFFFFF', buttonColor : '#FFC107', headerColor : '#673AB7' },
  { bundleName : ThemeBundle.IndigoPink, labelName : 'Indigo & Pink', backgroundColor : '#FFFFFF', buttonColor : '#FF4081', headerColor : '#3F51B5' },
  { bundleName : ThemeBundle.PinkBlueGrey, labelName : 'Pink & Blue Grey', backgroundColor : '#303030', buttonColor : '#607D8B', headerColor : '#E91E63' },
  { bundleName : ThemeBundle.PurpleGreen, labelName : 'Purple & Green', backgroundColor : '#303030', buttonColor : '#4CAF50', headerColor : '#9C27B0' }
];

export {
  ThemeBundle,
  ALL_THEMES
};

export type {
  Theme
};
