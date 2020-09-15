import {createTheme, createBox, createText} from '@shopify/restyle';
import {Platform} from 'react-native';

import {Theme as ThemeEnum} from '../store/reducers/ui';

const palette = {
  light: '#F3F0E9',
  darkBrown: '#A0816B',
  lightBrown: '#C5A187',
  brown: '#B07C59',
  darkBlue: '#373F5A',

  greenLight: '#48DC62',
  green: '#0ECD9D',

  red: '#F84141',

  darkestGray: '#333',
  darkerGray: '#444',
  darkGray: '#555',
  gray: '#666',
  lightGray: '#ececec',
  lighterGray: '#f9f9f9',

  gold: 'gold',
  orange: 'orange',
};

const theme = createTheme({
  textVariants: {
    header: {
      fontSize: 36,
      fontFamily: 'Montserrat-SemiBold',
    },
    title: {
      fontSize: 24,
      fontfamily: 'Montserrat-SemiBold',
    },
    subTitle: {
      fontSize: 20,
      fontfamily: 'Montserrat-SemiBold',
    },
    body: {
      fontSize: 16,
      fontFamily: 'Montserrat-Medium',
    },
    small: {
      fontSize: 12,
      fontFamily: 'Montserrat-Medium',
    },
  },
  fontSizes: {
    titleXl: 36,
    titleLg: 32,
    titleM: 24,
    textLg: 20,
    text: 16,
    small: 12,
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
      ...Platform.select({
        android: {
          elevation: 1,
        },
      }),
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      ...Platform.select({
        android: {
          elevation: 5,
        },
      }),
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      ...Platform.select({
        android: {
          elevation: 10,
        },
      }),
    },
  },
  colors: {
    white: 'white',
    background: 'white',
    backgroundTwo: palette.lightGray,
    backgroundThree: palette.lighterGray,
    foreground: palette.darkestGray,
    foregroundTwo: palette.darkerGray,
    foregroundBrown: palette.darkBrown,
    spacer: palette.lightGray,
    text: palette.gray,
    primary: palette.darkBrown,
    secondary: palette.lightBrown,
    positive: palette.green,
    positiveLight: palette.greenLight,
    negative: palette.red,
    lightGray: palette.lightGray,
    lighterGray: palette.lighterGray,
    gray: palette.gray,
    gold: palette.gold,
    dark: palette.darkestGray,
    transparent: 'transparent',
  },
  spacing: {
    xs: 8,
    s: 10,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 60,
  },
  borderRadii: {
    s: 5,
    m: 10,
    lg: 15,
    xl: 25,
    xxl: 36,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.darkestGray,
    backgroundTwo: palette.darkerGray,
    backgroundThree: palette.darkGray,
    foreground: palette.lightGray,
    foregroundTwo: palette.gray,
    foregroundBrown: palette.light,
    spacer: palette.darkerGray,
    primary: palette.brown,
    secondary: palette.lightBrown,
  },
};

export const themes: Record<ThemeEnum, Theme> = {
  light: theme,
  dark: darkTheme,
};

export type Theme = typeof theme;

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

export default theme;
