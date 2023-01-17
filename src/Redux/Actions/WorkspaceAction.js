import axios from "axios";
import {
  ADD_CARD,
  ADD_CARD_MEMBER,
  ADD_CHECKLIST_ITEM,
  ADD_COMMENT,
  ADD_LIST,
  ADD_MEMBER,
  ADD_WORKSPACE,
  COMPLETE_CHECKLIST_ITEM,
  DELETE_CARD,
  DELETE_CHECKLIST_ITEM,
  DELETE_COMMENT,
  DELETE_LIST,
  EDIT_CARD,
  EDIT_CHECKLIST_ITEM,
  EDIT_COMMENT,
  GET_CARD,
  GET_LIST,
  GET_WORKSPACE,
  GET_WORKSPACES,
  MOVE_CARD,
  MOVE_LIST,
  RENAME_LIST,
  WORKSPACE_ERROR,
} from "../Constants/WorkspaceConstants";
import { URL } from "../Url";

// GET WORKSPACE
export const getWorkspace = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "https://developer.mozilla.org",
        Vary: "Origin",
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
  } catch (error) {
    dispatch({
      type: WORKSPACE_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
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
        Accept: "application/json",
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "https://developer.mozilla.org",
        Vary: "Origin",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(`${URL}/api/workspaces`, config);

    dispatch({
      type: GET_WORKSPACES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: WORKSPACE_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
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
          Accept: "application/json",
          "Content-Type": "application/json",

          "Access-Control-Allow-Origin": "https://developer.mozilla.org",
          Vary: "Origin",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const res = await axios.post(`${URL}/api/workspaces`, body, config);

      dispatch({
        type: ADD_WORKSPACE,
        payload: res.data,
      });

      history.push(`${URL}/api/workspaces/${res.data._id}`);
    } catch (error) {
      dispatch({
        type: WORKSPACE_ERROR,
        payload: {
          message: error.response.statusText,
          status: error.response.status,
        },
      });
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
        Accept: "application/json",
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "https://developer.mozilla.org",
        Vary: "Origin",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(`${URL}/api/lists/${id}`, config);

    dispatch({
      type: GET_LIST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: WORKSPACE_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
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
        Accept: "application/json",
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "https://developer.mozilla.org",
        Vary: "Origin",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.post(`${URL}/api/lists`, body, config);

    dispatch({
      type: ADD_LIST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: WORKSPACE_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
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
        Accept: "application/json",
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "https://developer.mozilla.org",
        Vary: "Origin",
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
    dispatch({
      type: WORKSPACE_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
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
        Accept: "application/json",
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "https://developer.mozilla.org",
        Vary: "Origin",
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
    dispatch({
      type: WORKSPACE_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// DELETE LIST
export const deleteList = (listId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "https://developer.mozilla.org",
        Vary: "Origin",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.delete(`${URL}/api/lists/${listId}`, config);

    dispatch({ type: DELETE_LIST, payload: res.data });
  } catch (error) {
    dispatch({
      type: WORKSPACE_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
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
        Accept: "application/json",
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "https://developer.mozilla.org",
        Vary: "Origin",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(`${URL}/api/cards/${id}`, config);

    dispatch({
      type: GET_CARD,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: WORKSPACE_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
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
        Accept: "application/json",
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "https://developer.mozilla.org",
        Vary: "Origin",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.post(`${URL}/api/cards`, body, config);

    dispatch({
      type: ADD_CARD,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: WORKSPACE_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
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
        Accept: "application/json",
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "https://developer.mozilla.org",
        Vary: "Origin",
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
    dispatch({
      type: WORKSPACE_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// DELETE CARD
export const deleteCard = (listId, cardId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "https://developer.mozilla.org",
        Vary: "Origin",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.delete(
      `${URL}/api/cards/${listId}/${cardId}`,
      config
    );

    dispatch({ type: DELETE_CARD, payload: res.data });
  } catch (error) {
    dispatch({
      type: WORKSPACE_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// EDIT CARD
export const editCard = (cardId, formData) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "https://developer.mozilla.org",
        Vary: "Origin",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.patch(
      `${URL}/api/cards/edit/${cardId}`,
      formData,
      config
    );

    dispatch({
      type: EDIT_CARD,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: WORKSPACE_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// ADD MEMBER
export const addMember = (userId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "https://developer.mozilla.org",
        Vary: "Origin",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.put(
      `${URL}/api/workspaces/addMember/${userId}`,
      config
    );

    dispatch({
      type: ADD_MEMBER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: WORKSPACE_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// ADD CARD MEMBER
// prettier-ignore
export const addCardMember = (userId, cardId, add) => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",

          "Access-Control-Allow-Origin": "https://developer.mozilla.org",
          Vary: "Origin",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const res = await axios.post(
        `${URL}/api/cards/addMember/${add}/${cardId}/${userId}`,
        config
      );

      dispatch({
        type: ADD_CARD_MEMBER,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: WORKSPACE_ERROR,
        payload: {
          message: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

// ADD CHECKLIST ITEM
// prettier-ignore
export const addChecklistItem = (cardId, text) => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",

          "Access-Control-Allow-Origin": "https://developer.mozilla.org",
          Vary: "Origin",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const res = await axios.post(
        `${URL}/api/checklists/${cardId}`,
        {text},
        config
      );

      dispatch({
        type: ADD_CHECKLIST_ITEM,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: WORKSPACE_ERROR,
        payload: {
          message: error.text,
          status: error.response.status,
        },
      });
    }
  };

// EDIT CHECKLIST ITEM
// prettier-ignore
export const editChecklistItem = (cardId, itemId, text) => async (dispatch) => {
    try {

      const res = await axios.patch(
        `${URL}/api/checklists/${cardId}/${itemId}`,{text}
      );

      dispatch({
        type: EDIT_CHECKLIST_ITEM,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: WORKSPACE_ERROR,
        payload: {
          message: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

// COMPLETE CHECKLIST ITEM
// prettier-ignore
export const completeChecklistItem = (formData) => async (dispatch) => {
  try {
    const { cardId, complete, itemId } = formData;

    const res = await axios.patch(
      `${URL}/api/checklists/${cardId}/${complete}/${itemId}`,
      
    );

    dispatch({
      type: COMPLETE_CHECKLIST_ITEM,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: WORKSPACE_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// DELETE CHECKLIST ITEM
// prettier-ignore
export const deleteChecklistItem = (cardId, itemId) => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",

          "Access-Control-Allow-Origin": "https://developer.mozilla.org",
          Vary: "Origin",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const res = await axios.delete(
        `${URL}/api/checklists/${cardId}/${itemId}`,
        config
      );

      dispatch({
        type: DELETE_CHECKLIST_ITEM,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: WORKSPACE_ERROR,
        payload: {
          message: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

// ADD COMMENT
// prettier-ignore
export const addComment = (cardId, comment) => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",

          "Access-Control-Allow-Origin": "https://developer.mozilla.org",
          Vary: "Origin",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const res = await axios.post(
        `${URL}/api/activity/${cardId}`,
        comment,
        config
      );

      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: WORKSPACE_ERROR,
        payload: {
          message: error.text,
          status: error.response.status,
        },
      });
    }
  };

// EDIT COMMENT
// prettier-ignore
export const editComment = (cardId, commentId, text) => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",

          "Access-Control-Allow-Origin": "https://developer.mozilla.org",
          Vary: "Origin",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const res = await axios.patch(
        `${URL}/api/activity/${cardId}/${commentId}`,
        { text }
      );

      dispatch({
        type: EDIT_COMMENT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: WORKSPACE_ERROR,
        payload: {
          message: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

// DELETE COMMENT
// prettier-ignore
export const deleteComment = (cardId, commentId) => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",

          "Access-Control-Allow-Origin": "https://developer.mozilla.org",
          Vary: "Origin",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const res = await axios.delete(
        `${URL}/api/activity/${cardId}/${commentId}`,
        config
      );

      dispatch({
        type: DELETE_COMMENT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: WORKSPACE_ERROR,
        payload: {
          message: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
