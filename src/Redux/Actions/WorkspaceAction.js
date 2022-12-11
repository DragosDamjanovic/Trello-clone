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
    const { data } = await axios.get(`${URL}/api/workspace/${id}`);

    if (res) {
      axios.defaults.headers.common["workplaceId"] = id;
    } else {
      delete axios.defaults.headers.common["workplaceId"];
    }

    dispatch({
      type: GET_WORKSPACE,
      payload: { ...data, listObjects: [], cardObjects: [] },
    });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

// GET WORKSPACES
export const getWorkspaces = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/api/workspace`);

    dispatch({
      type: GET_WORKSPACES,
      payload: data,
    });
  } catch (err) {
    // WORKSPACE_ERROR not implemented
    res.status(500);
    throw new Error(err.message);
  }
};

// ADD WORKSPACE
export const addWorkspace = (formData, history) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);
    const res = await axios.post(`${URL}/api/workspace`, body, config);

    dispatch({
      type: ADD_WORKSPACE,
      payload: res.data,
    });

    history.push(`${URL}/api/workspace/${(res.data, _id)}`);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

// GET LIST
export const getList = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/api/lists/${id}`);

    dispatch({
      type: GET_LIST,
      payload: data,
    });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

// ADD LIST
export const addList = (formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);
    const res = await axios.get(`${URL}/api/lists`, config, body);

    dispatch({
      type: ADD_LIST,
      payload: res.data,
    });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

// GET CARD
export const getCard = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/api/cards/${id}`);

    dispatch({
      type: GET_CARD,
      payload: data,
    });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

// ADD CARD
export const addCard = (formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);
    const res = await dispatchaxios.get(`${URL}/api/cards/${id}`, config, body);

    dispatch({
      type: ADD_CARD,
      payload: res.data,
    });
  } catch (err) {
    res.ststus(500);
    throw new Error(err.message);
  }
};
