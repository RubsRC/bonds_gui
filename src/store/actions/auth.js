import axios from "axios";
import * as actionTypes from "./actionsTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

const handleAuthSuccess = (res, dispatch) => {
  const token = res.data.key;
  // 1 hour exp date
  const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
  // save both values in LS
  localStorage.setItem("token", token);
  localStorage.setItem("expirationDate", expirationDate);
  dispatch(authSuccess(token));
  checkAuthTimeout(3600);
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/rest-auth/login/", {
        username,
        password,
      })
      .then((res) => handleAuthSuccess(res, dispatch))
      .catch((error) => dispatch(authFail(error)));
  };
};

export const authSignup = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/rest-auth/registration/", {
        username,
        email,
        password1,
        password2,
      })
      .then((res) => handleAuthSuccess(res, dispatch))
      .catch((error) => dispatch(authFail(error)));
  };
};
