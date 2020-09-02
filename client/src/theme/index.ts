import {createTheme} from '@shopify/restyle';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  lightestBrown: '#f2edd7ff',
  lightBrown: '#d9b382',
  darkBrown: '#755139ff',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  red: '#F84141',

  black: '#0B0B0B',
  white: '#F0F2F3',

  gray: 'gray',
  lightGray: 'lightgray',

  gold: 'gold',
  orange: 'orange',
  brown: 'brown',
};

const theme = createTheme({
  fontSizes: {
    titleLg: 36,
    title: 32,
    subTitle: 24,
    textLg: 20,
    textSm: 16,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    },
  },
  colors: {
    dark: palette.black,
    primary: palette.darkBrown,
    secondary: palette.lightBrown,
    light: palette.lightestBrown,
    gray: palette.gray,
    positive: palette.greenDark,
    negative: palette.red,
    wishlist: palette.gold,
    reading: palette.orange,
    read: palette.brown,
    lightGray: palette.lightGray,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 60,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;

export default theme;
