import axios from "axios";
import * as actionTypes from "./actionsTypes";

const getWorkspaceListStart = () => {
  return {
    type: actionTypes.GET_WORKSPACE_LIST_START,
  };
};

const getWorkspaceListSuccess = (bonds) => {
  return {
    type: actionTypes.GET_WORKSPACE_LIST_SUCCESS,
    bonds,
  };
};

const getWorkspaceListFail = (error) => {
  return {
    type: actionTypes.GET_WORKSPACE_LIST_FAIL,
    error,
  };
};

export const getWorkspaceBonds = (state) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    dispatch(getWorkspaceListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get("http://127.0.0.1:8000/api/bond/list-create/")
      .then((res) => {
        const bonds = res.data;
        dispatch(getWorkspaceListSuccess(bonds));
      })
      .catch((err) => {
        dispatch(getWorkspaceListFail(err));
      });
  };
};

export const getDirtyWorkspaceBonds = () => {
  const token = localStorage.getItem("token");
  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
  axios
    .get("http://127.0.0.1:8000/api/bond/list-create/")
    .then((res) => {
      const bonds = res.data;
      console.log(bonds);
      return getWorkspaceListSuccess(bonds);
    })
    .catch((err) => {
      console.error(err);
    });
};
