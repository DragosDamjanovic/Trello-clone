import axios from "axios";
import {
  ADD_CARD,
  ADD_LIST,
  ADD_WORKSPACE,
  GET_CARD,
  GET_LIST,
  GET_WORKSPACE,
  GET_WORKSPACES,
  MOVE_CARD,
  MOVE_LIST,
  RENAME_LIST,
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
export const getList = (id) => async (dispatch, getState) => {
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

    const res = await axios.get(`${URL}/api/lists/${id}`, config);

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
    throw new Error(message);
    // if (message === "Not authorized, token failed") {
    //   dispatch(logout());
    // }
  }
};

// RENAME LIST
export const renameList = (listId, formData) => async (dispatch, getState) => {
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

    const res = await axios.patch(
      `${URL}/api/lists/rename/${listId}`,
      formData,
      config
    );

    dispatch({
      type: RENAME_LIST,
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

// MOVE LIST
export const moveList = (listId, formData) => async (dispatch, getState) => {
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

    const res = await axios.patch(
      `${URL}/api/lists/move/${listId}`,
      body,
      config
    );

    dispatch({
      type: MOVE_LIST,
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

// GET CARD
export const getCard = (id) => async (dispatch, getState) => {
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

    const res = await axios.get(`${URL}/api/cards/${id}`, config);

    dispatch({
      type: GET_CARD,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    throw new Error(message);
    // if (message === "Not authorized, token failed") {
    //   dispatch(logout());
    // }
  }
};

// ADD CARD
export const addCard = (formData) => async (dispatch, getState) => {
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

    const res = await axios.post(`${URL}/api/cards`, body, config);

    dispatch({
      type: ADD_CARD,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    throw new Error(message);
    // if (message === "Not authorized, token failed") {
    //   dispatch(logout());
    // }
  }
};

// MOVE CARD
export const moveCard = (cardId, formData) => async (dispatch, getState) => {
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

    const res = await axios.patch(
      `${URL}/api/cards/move/${cardId}`,
      body,
      config
    );

    dispatch({
      type: MOVE_CARD,
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
