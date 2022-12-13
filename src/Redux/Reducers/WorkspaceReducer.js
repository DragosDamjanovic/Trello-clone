import {
  ADD_CARD,
  ADD_LIST,
  ADD_WORKSPACE,
  GET_CARD,
  GET_LIST,
  GET_WORKSPACE,
  GET_WORKSPACES,
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
    case ADD_WORKSPACE: {
      return { ...state, workspaces: [action.payload, ...state.workspaces] };
    }
    case GET_LIST: {
      return {
        ...state,
        workspace: {
          ...state.workspace,
          listObjects: [...state.workspace.listObjects, action.payload],
        },
      };
    }
    case ADD_LIST: {
      return {
        ...state,
        workspace: {
          ...state.workspace,
          lists: [...state.workspace.lists, action.payload._id],
        },
      };
    }
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
    default:
      return state;
  }
};
