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
    case WORKSPACE_ERROR:
      return { ...state, error: action.payload };
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
          // Filter lists and list objects to remove deleted list
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
          // Find list to add card to and add card ID to its cards array
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
          // Find lists to move card between and update their cards arrays and metadata
          listObjects: state.workspace.listObjects.map((list) =>
            list._id === action.payload.from._id
              ? action.payload.from
              : list._id === action.payload.to._id
              ? action.payload.to
              : list
          ),
          // Filter card objects to remove moved card unless it's being moved within the same list
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
          // Filter card objects to remove deleted card
          cardObjects: state.workspace.cardObjects.filter(
            (card) => card._id !== action.payload
          ),
          // Find list containing deleted card and remove card ID from its cards array
          listObjects: state.workspace.listObjects.map((list) =>
            list.cards.includes(action.payload)
              ? {
                  ...list,
                  cards: list.cards.filter((card) => card !== action.payload),
                }
              : list
          ),
        },
      };
    case EDIT_CARD:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          // Find card to update and replace its data with new data from action payload
          cardObjects: state.workspace.cardObjects.map((card) =>
            card._id === action.payload._id ? action.payload : card
          ),
        },
      };
    case ADD_MEMBER:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          members: action.payload,
        },
      };
    case ADD_CARD_MEMBER:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          cardObjects: state.workspace.cardObjects.map((card) =>
            card._id === action.payload.cardId
              ? { ...card, members: [...card.members, action.payload] }
              : card
          ),
        },
      };
    case ADD_CHECKLIST_ITEM:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          cardObjects: state.workspace.cardObjects.map((card) =>
            card._id === action.payload._id
              ? {
                  ...card,
                  checklist: [
                    ...card.checklist,
                    action.payload.checklist.slice(-1)[0],
                  ],
                }
              : card
          ),
        },
      };
    case EDIT_CHECKLIST_ITEM:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          cardObjects: state.workspace.cardObjects.map((card) =>
            card._id === action.payload._id
              ? {
                  ...card,
                  checklist: [...action.payload.checklist],
                }
              : card
          ),
        },
      };
    case COMPLETE_CHECKLIST_ITEM:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          cardObjects: state.workspace.cardObjects.map((card) =>
            card._id === action.payload._id
              ? {
                  ...card,
                  checklist: [...action.payload.checklist],
                }
              : card
          ),
        },
      };
    case DELETE_CHECKLIST_ITEM:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          cardObjects: state.workspace.cardObjects.map((card) =>
            card._id === action.payload._id
              ? {
                  ...card,
                  checklist: [...action.payload.checklist],
                }
              : card
          ),
        },
      };
    case ADD_COMMENT:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          cardObjects: state.workspace.cardObjects.map((card) =>
            card._id === action.payload._id
              ? {
                  ...card,
                  activity: [
                    ...card.activity,
                    action.payload.activity.slice(-1)[0],
                  ],
                }
              : card
          ),
        },
      };
    case EDIT_COMMENT:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          cardObjects: state.workspace.cardObjects.map((card) =>
            card._id === action.payload._id
              ? {
                  ...card,
                  activity: [...action.payload.activity],
                }
              : card
          ),
        },
      };
    case DELETE_COMMENT:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          cardObjects: state.workspace.cardObjects.map((card) =>
            card._id === action.payload._id
              ? {
                  ...card,
                  activity: [...action.payload.activity],
                }
              : card
          ),
        },
      };
    default:
      return state;
  }
};
