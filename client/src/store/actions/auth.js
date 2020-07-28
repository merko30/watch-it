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

import { navigate } from "../../utils/navigation";
import { axios } from "../../config/axios";
import { LoginManager, AccessToken } from "react-native-fbsdk";

export const setStatus = (user) => (dispatch) => {
  dispatch({
    type: SET_STATUS,
    user: user,
  });
};

export const getUser = () => async (dispatch) => {
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

export const signOut = () => (dispatch) => {
  AsyncStorage.multiRemove(["token", "user"])
    .then(() => {
      dispatch({
        type: SIGN_OUT,
      });
      dispatch(setStatus(null));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const register = (data) => async (dispatch) => {
  dispatch(createUserAction.start());
  try {
    const { data: user } = await Axios.post(
      `${REACT_APP_SERVER_API_URL}/auth/register`,
      data
    );
    dispatch(createUserAction.success(user));
    navigate("Login");
    Axios.defaults.headers["Authorization"] = user.token;
  } catch (error) {
    console.log("REGISTER", error);
    dispatch(createUserAction.failure(error.toString()));
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(signInAction.start());
  try {
    const {
      data: { token },
    } = await axios.post("/auth/login", JSON.stringify(data));
    console.log(token);
    await AsyncStorage.setItem("token", `Bearer ${token}`);
    dispatch(signInAction.success());
  } catch (error) {
    console.log("LOGIN", error);
    dispatch(signInAction.failure(error.toString()));
  }
};

export const loginViaFacebook = () => async dispatch => {
  dispatch(signInAction.start());
  try {
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])
    if(result.isCancelled) {
      console.log('cancelled');
    }else if(result.error) {
      console.log('ERROR FACEBOOK', error);
    } else if(result.grantedPermissions) {
      const {accessToken} = await AccessToken.getCurrentAccessToken();
      console.log(accessToken);
      
    }
  } catch (error) {
    
  }
}

export const changeAvatar = (avatar) => async (dispatch) => {
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
