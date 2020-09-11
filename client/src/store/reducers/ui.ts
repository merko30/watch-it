import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum FontSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

interface State {
  theme: Theme;
  fontSize: FontSize;
}

const initialState: State = {
  theme: Theme.DARK,
  fontSize: FontSize.MEDIUM,
};

const ui = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    },
    setFontSize: (state, action: PayloadAction<FontSize>) => {
      state.fontSize = action.payload;
    },
  },
});

export const {toggleTheme, setFontSize} = ui.actions;

export default ui.reducer;
