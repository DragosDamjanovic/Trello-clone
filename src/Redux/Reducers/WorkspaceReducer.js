import {
  ADD_CARD,
  ADD_LIST,
  ADD_WORKSPACE,
  DELETE_CARD,
  DELETE_LIST,
  GET_CARD,
  GET_LIST,
  GET_WORKSPACE,
  GET_WORKSPACES,
  MOVE_CARD,
  MOVE_LIST,
  RENAME_LIST,
} from "../Constants/WorkspaceConstants";

export const WorkspaceReducer = (
  state = { workspaces: [], workspace: null },
  action
) => {
  switch (action.type) {
    case GET_WORKSPACES:
      return { ...state, workspaces: action.payload };
    case GET_WORKSPACE:
      return { ...state, workspace: { ...state.workspace, ...action.payload } };
    case ADD_WORKSPACE:
      return { ...state, workspaces: [action.payload, ...state.workspaces] };

    case GET_LIST:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          listObjects: [...state.workspace.listObjects, action.payload],
        },
      };

    case ADD_LIST:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          lists: [...state.workspace.lists, action.payload._id],
        },
      };

    case RENAME_LIST:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          listObjects: state.workspace.listObjects.map((list) =>
            list._id === action.payload._id ? action.payload : list
          ),
        },
      };
    case MOVE_LIST:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          lists: action.payload,
        },
      };
    case DELETE_LIST:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          lists: state.workspace.lists.filter((id) => id !== action.payload),
          listObjects: state.workspace.listObjects.filter(
            (list) => list._id !== action.payload
          ),
        },
      };
    case GET_CARD:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          cardObjects: [...state.workspace.cardObjects, action.payload],
        },
      };
    case ADD_CARD:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          listObjects: state.workspace.listObjects.map((list) =>
            list._id === action.payload.listId
              ? { ...list, cards: [...list.cards, action.payload.cardId] }
              : list
          ),
        },
      };
    case MOVE_CARD:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          listObjects: state.workspace.listObjects.map((list) =>
            list._id === action.payload._id
              ? action.payload.from
              : list._id === action.payload.to._id
              ? action.payload.to
              : list
          ),
          cardObjects: state.workspace.cardObjects.filter(
            (card) =>
              card._id !== action.payload.cardId ||
              action.payload.to._id === action.payload.from._id
          ),
        },
      };
    case DELETE_CARD:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          cardObjects: state.workspace.cardObjects.filter(
            (card) => card._id !== action.payload
          ),
          listObjects: state.workspace.listObjects.filter((list) =>
            list.cards.includes(action.payload)
              ? {
                  ...list,
                  cards: list.cards.filter((card) => card !== action.payload),
                }
              : list
          ),
        },
      };
    default:
      return state;
  }
};
