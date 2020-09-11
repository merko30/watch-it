import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
// import {LoginManager, AccessToken} from 'react-native-fbsdk';

import {
  createUser,
  fetchUser,
  loginUser,
  updateAvatar,
  sendResetMail,
  updatePassword,
  verifyCode,
  updateUserRequest,
  updatePasswordRequest,
} from '../../api/users';

import {User, AppThunk, LoginData, VerifyResetCodeParams} from '../../types';

import {navigate} from '../../utils/navigation';
import errorHandler from '../../utils/errorHandler';

export interface State {
  loggedIn: boolean;
  loading: boolean;
  error: string | null;
  user: null | User;
  message: null | string;
}

const initialState: State = {
  loggedIn: false,
  loading: false,
  user: null,
  message: null,
  error: null,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    error: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoggedIn: (state) => {
      state.loggedIn = true;
      state.loading = false;
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.error = null;
      state.loading = false;
    },
    clearUser: (state) => {
      state.loading = false;
      state.user = null;
      state.loggedIn = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (!action.payload) {
        state.error = null;
      }
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    changeAvatarSuccess: (state, action: PayloadAction<string>) => {
      state.user!.avatar = action.payload;
      state.loading = false;
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
    },
  },
});

export const {
  error: setError,
  setLoggedIn,
  setUser,
  clearUser,
  setLoading,
  changeAvatarSuccess,
  setMessage,
  clearMessage,
  clearError,
  updateUserSuccess,
} = auth.actions;

const error = (error: string): AppThunk => (dispatch) => {
  dispatch(setError(error));

  setTimeout(() => {
    dispatch(clearError());
  }, 5000);
};

const setAndClearMessage = (message: string): AppThunk => (dispatch) => {
  dispatch(setMessage(message));

  setTimeout(() => {
    dispatch(clearMessage());
  }, 5000);
};

export const getUser = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const {
      data: {user},
    } = await fetchUser();
    dispatch(setUser(user));
  } catch (err) {
    dispatch(error(errorHandler(err)));
  }
};

export const signOut = (): AppThunk => (dispatch) => {
  AsyncStorage.removeItem('token')
    .then(() => {
      dispatch(clearUser());
    })
    .catch(() => {
      dispatch(error('Something went wrong'));
    });
};

export const register = (data: Partial<User>): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await createUser(data);
    dispatch(setLoading(false));
    navigate('Login');
  } catch (err) {
    dispatch(error(errorHandler(err)));
  }
};

export const login = (data: LoginData): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const {
      data: {token},
    } = await loginUser(data);
    await AsyncStorage.setItem('token', `Bearer ${token}`);
    dispatch(setLoggedIn());
  } catch (err) {
    dispatch(error(errorHandler(err)));
  }
};

export const sendResetPasswordMail = (email: string): AppThunk => async (
  dispatch,
) => {
  dispatch(setLoading(true));
  try {
    const {
      data: {message, email: mail},
    } = await sendResetMail(email);
    dispatch(setLoading(false));
    dispatch(setAndClearMessage(message));
    navigate('VerifyCode', {email: mail});
  } catch (err) {
    dispatch(error(errorHandler(err)));
  }
};

export const verifyResetCode = (
  data: VerifyResetCodeParams,
): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const {
      data: {message},
    } = await verifyCode(data);
    dispatch(setLoading(false));
    dispatch(setAndClearMessage(message));
    navigate('ResetPassword', {email: data.email});
  } catch (err) {
    dispatch(error(errorHandler(err)));
  }
};

export const resetPassword = (
  email: string,
  password: string,
): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const {
      data: {message},
    } = await updatePassword(email, password);
    dispatch(setLoading(false));
    dispatch(setAndClearMessage(message));
    navigate('Login');
  } catch (err) {
    dispatch(error(errorHandler(err)));
  }
};

export const updateUser = (data: Partial<User>): AppThunk => async (
  dispatch,
) => {
  dispatch(setLoading(true));
  try {
    const {
      data: {user, message},
    } = await updateUserRequest(data);
    dispatch(updateUserSuccess(user));
    dispatch(setAndClearMessage(message));
  } catch (err) {
    dispatch(errorHandler(err));
  }
};

export const changeAvatar = (avatar: any): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  const formData = new FormData();
  formData.append('avatar', avatar);
  try {
    const {
      data: {avatar: avatarUri, message},
    } = await updateAvatar(formData);

    dispatch(setAndClearMessage(message));
    dispatch(changeAvatarSuccess(avatarUri));
  } catch (err) {
    dispatch(error(errorHandler(err)));
  }
};

export const setPassword = (
  password: string,
  newPassword: string,
): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const {
      data: {user, message},
    } = await updatePasswordRequest(password, newPassword);
    console.log(user, message);
    dispatch(setAndClearMessage(message));
    dispatch(setUser(user));
  } catch (err) {
    dispatch(error(errorHandler(err)));
  }
};

export default auth.reducer;
