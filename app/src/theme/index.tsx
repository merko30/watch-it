import { createTheme, createBox, createText } from '@shopify/restyle';
import { Platform } from 'react-native';

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
};

const theme = createTheme({
  textVariants: {
    defaults: {
      // fontFamily: 'Montserrat-Regular',
    },
    header: {
      fontSize: 36,
      // fontFamily: 'Montserrat-SemiBold',
    },
    title: {
      fontSize: 24,
      // fontfamily: 'Montserrat-SemiBold',
    },
    subtitle: {
      fontSize: 20,
      // fontfamily: 'Montserrat-SemiBold',
    },
    body: {
      fontSize: 16,
      // fontFamily: 'Montserrat-Medium',
    },
    small: {
      fontSize: 12,
      // fontFamily: 'Montserrat-Medium',
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
      // shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      // ...Platform.select({
      //   android: {
      //     elevation: 1,
      //   },
      // }),
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
    black: 'black',
    background: 'white',
    foreground: palette.darkestGray,
    spacer: palette.lightGray,
    text: palette.gray,
    primary: palette.darkBrown,
    secondary: palette.lightBrown,
    success: palette.green,
    error: palette.red,
    gold: palette.gold,
    transparent: 'transparent',
  },
  spacing: {
    0: 0,
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
    full: 9999,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  scrollBox: {
    primary: {
      flex: 1,
    },
  },
});

const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.darkestGray,
    foreground: palette.lightGray,
    spacer: palette.gray,
    primary: palette.brown,
    secondary: palette.lightBrown,
  },
};

export const themes: Record<'light' | 'dark', Theme> = {
  light: theme,
  dark: darkTheme,
};

export type Theme = typeof theme;

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

export default theme;
