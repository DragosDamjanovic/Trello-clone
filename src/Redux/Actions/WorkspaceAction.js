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
import { URL } from "../Url";
import { logout } from "./UserAction";

// GET WORKSPACE
export const getWorkspace = (id) => async (dispatch, getState) => {
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
    const res = await axios.get(`${URL}/api/workspaces/${id}`, config);

    if (res) {
      axios.defaults.headers.common["workspaceId"] = id;
    } else {
      delete axios.defaults.headers.common["workspaceId"];
    }

    dispatch({
      type: GET_WORKSPACE,
      payload: { ...res.data, listObjects: [], cardObjects: [] },
    });
    localStorage.setItem("workspace", JSON.stringify(res.data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    throw new Error(message);
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

    const res = await axios.get(`${URL}/api/workspaces`, config);

    dispatch({
      type: GET_WORKSPACES,
      payload: res.data,
    });
    localStorage.setItem("workspace", JSON.stringify(res.data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    throw new Error(message);
  }
};

// ADD WORKSPACE
// prettier-ignore
export const addWorkspace = (formData, history) => async (dispatch, getState) => {
    try {
      const body = JSON.stringify(formData);
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const res = await axios.post(`${URL}/api/workspaces`, body, config);

      dispatch({
        type: ADD_WORKSPACE,
        payload: res.data,
      });

      history.push(`${URL}/api/workspaces/${res.data.id}`);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      throw new Error(message);
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
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    throw new Error(message);
  }
};

// ADD LIST
export const addList = (formData) => async (dispatch, getState) => {
  try {
    const body = JSON.stringify(formData);
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.post(`${URL}/api/lists`, body, config);

    dispatch({
      type: ADD_LIST,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
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
    const res = await axios.post(`${URL}/api/cards`, body);

    dispatch({
      type: ADD_CARD,
      payload: res.data,
    });
  } catch (err) {
    err.ststus(500);
    throw new Error(err.message);
  }
};
