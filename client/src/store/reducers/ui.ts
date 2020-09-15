import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

interface State {
  theme: Theme;
}

const initialState: State = {
  theme: Theme.DARK,
};

const ui = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    },
  },
});

export const {toggleTheme} = ui.actions;

export default ui.reducer;
