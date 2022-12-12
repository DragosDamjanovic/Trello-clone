import axios from "axios";
import {
  ADD_CARD,
  ADD_LIST,
  ADD_WORKSPACE,
  GET_CARD,
  GET_LIST,
  GET_WORKSPACE,
  GET_WORKSPACES,
} from "../Constants/WorkspaceConstants";

// GET WORKSPACE
export const getWorkspace = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${URL}/api/workspace/${id}`);

    if (res) {
      axios.defaults.headers.common["workplaceId"] = id;
    } else {
      delete axios.defaults.headers.common["workplaceId"];
    }

    dispatch({
      type: GET_WORKSPACE,
      payload: { ...res.data, listObjects: [], cardObjects: [] },
    });
    localStorage.setItem("workspace", JSON.stringify(res.data));
  } catch (err) {
    err.status(500);
    throw new Error(err.message);
  }
};

// GET WORKSPACES
export const getWorkspaces = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get("http://localhost:5000/api/workspaces", config);

    dispatch({
      type: GET_WORKSPACES,
      payload: res.data,
    });
    localStorage.setItem("workspace", JSON.stringify(res.data));
  } catch (err) {
    // WORKSPACE_ERROR not implemented
    err.status(500);
    throw new Error(err.message);
  }
};

// ADD WORKSPACE
export const addWorkspace = (formData, history) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);
    const res = await axios.post(`${URL}/api/workspace`, body);

    dispatch({
      type: ADD_WORKSPACE,
      payload: res.data,
    });

    history.push(`${URL}/api/workspace/${res.data.id}`);
  } catch (err) {
    err.status(500);
    throw new Error(err.message);
  }
};

// GET LIST
export const getList = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${URL}/api/lists/${id}`);

    dispatch({
      type: GET_LIST,
      payload: res.data,
    });
  } catch (err) {
    err.status(500);
    throw new Error(err.message);
  }
};

// ADD LIST
export const addList = (formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);
    const res = await axios.get(`${URL}/api/lists`, body);

    dispatch({
      type: ADD_LIST,
      payload: res.data,
    });
  } catch (err) {
    err.status(500);
    throw new Error(err.message);
  }
};

// GET CARD
export const getCard = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${URL}/api/cards/${id}`);

    dispatch({
      type: GET_CARD,
      payload: res.data,
    });
  } catch (err) {
    err.status(500);
    throw new Error(err.message);
  }
};

// ADD CARD
export const addCard = (formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);
    const res = await axios.get(`${URL}/api/cards`, body);

    dispatch({
      type: ADD_CARD,
      payload: res.data,
    });
  } catch (err) {
    err.ststus(500);
    throw new Error(err.message);
  }
};
