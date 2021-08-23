import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility";

const initialState = {
  bonds: [],
  error: null,
  loading: false,
};

const getWorkspaceListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const getWorkspaceListSuccess = (state, action) => {
  return updateObject(state, {
    bonds: action.bonds,
    error: null,
    loading: false,
  });
};

const getWorkspaceListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_WORKSPACE_LIST_START:
      return getWorkspaceListStart(state, action);
    case actionTypes.GET_WORKSPACE_LIST_SUCCESS:
      return getWorkspaceListSuccess(state, action);
    case actionTypes.GET_WORKSPACE_LIST_FAIL:
      return getWorkspaceListFail(state, action);
    default:
      return state;
  }
};

export default reducer;
