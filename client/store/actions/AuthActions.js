import AsyncStorage from "@react-native-community/async-storage";
import Axios from "axios";

import createAction from "../utils/createAction";

export const createUserAction = createAction("CREATE_USER");
export const signInAction = createAction("SIGN_IN");
export const changeAvatarAction = createAction("CHANGE_AVATAR");
export const getUserAction = createAction("GET_USER");

export const SET_STATUS = "SET_STATUS";
export const SIGN_OUT = "SIGN_OUT";

import { REACT_APP_SERVER_API_URL } from "react-native-dotenv";
import history from "../../config/history";

export const setStatus = user => dispatch => {
  dispatch({
    type: SET_STATUS,
    user: user
  });
};

export const getUser = () => async dispatch => {
  dispatch(getUserAction.start());
  try {
    const response = await Axios.get(`${REACT_APP_SERVER_API_URL}/users/${id}`);
    const user = await response.json();
    if (!response.ok) {
      dispatch(getUserAction.failure(user));
    } else {
      dispatch(setStatus(user));
    }
  } catch (error) {
    dispatch(getUserAction.failure(error));
  }
};

export const signOut = () => dispatch => {
  AsyncStorage.multiRemove(["token", "user"])
    .then(() => {
      dispatch({
        type: SIGN_OUT
      });
      dispatch(setStatus(null));
    })
    .catch(err => {
      console.log(err);
    });
};

export const register = data => async dispatch => {
  dispatch(createUserAction.start());
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("avatar", data.avatar);

  try {
    const response = await Axios.post(
      `${REACT_APP_SERVER_API_URL}/auth/register`,
      formData
    );
    const user = await response.data;
    dispatch(createUserAction.success(user));
    Axios.defaults.headers["Authorization"] = user.token;
    history.push("/LoginScreen");
  } catch (error) {
    dispatch(createUserAction.failure(error.response.data));
  }
};

export const login = data => async dispatch => {
  dispatch(signInAction.start());
  try {
    const response = await Axios.post(
      `${REACT_APP_SERVER_API_URL}/auth/login`,
      JSON.stringify(data)
    );
    const data = response.data;
    dispatch(signInAction.success(data));
    await AsyncStorage.setItem("token", `Bearer ${data.token}`);
    history.push("/HomeScreen");
  } catch (error) {
    dispatch(signInAction.failure(error.response.data));
  }
};

export const changeAvatar = avatar => async dispatch => {
  dispatch(changeAvatarAction.start());
  const formData = new FormData();
  d.append("avatar", avatar);
  try {
    const response = await Axios.patch(
      `${REACT_APP_SERVER_API_URL}/auth/usersAvatar/${id}`,
      formData
    );
    const user = await response.json();
    if (!response.ok) {
      dispatch(changeAvatarAction.failure(user));
    } else {
      dispatch(changeAvatarAction.success(user));
      dispatch(setStatus(user.user));
    }
  } catch (error) {
    dispatch(changeAvatarAction.failure(error));
  }
};
