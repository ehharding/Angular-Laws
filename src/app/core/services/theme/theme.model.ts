enum ThemeBundle {
  IndigoPink = 'indigo-pink',
  PinkBlueGrey = 'pink-bluegrey'
}

interface Theme {
  bundleName : ThemeBundle;
  labelName : string;
  backgroundColor : string;
  buttonColor : string;
  headerColor : string;
}

const ALL_THEMES : Theme[] = [
  { bundleName : ThemeBundle.IndigoPink, labelName : 'Light', backgroundColor : '#FFFFFF', buttonColor : '#FF4081', headerColor : '#3F51B5' },
  { bundleName : ThemeBundle.PinkBlueGrey, labelName : 'Dark', backgroundColor : '#303030', buttonColor : '#607D8B', headerColor : '#E91E63' }
];

export {
  ThemeBundle,
  ALL_THEMES
};

export type {
  Theme
};
