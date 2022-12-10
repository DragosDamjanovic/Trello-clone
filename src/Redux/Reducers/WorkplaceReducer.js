import {
  WORKPLACE_DELETE_LIST,
  WORKPLACE_ADD_LIST,
  WORKPLACE_MOVE_LIST,
} from "../Constants/WorkplaceConstants";

// BY WORKPLACE ID
export const WorkplaceByIdReducer = (state = { lists: [] }, action) => {
  switch (action.type) {
    case WORKPLACE_ADD_LIST:
      const { listId } = action.payload;
      return { lists: [...state.lists, listId] };
    case WORKPLACE_MOVE_LIST:
      const { oldListIndex, newListIndex } = action.payload;
      const newLists = Array.from(state.lists);
      const [removedList] = newLists.splice(oldListIndex, 1);
      newLists.splice(newListIndex, 0, removedList);
      return { lists: newLists };
    case WORKPLACE_DELETE_LIST: {
      const filterDeleted = (tmpListId) => tmpListId !== listId;
      const newLists = state.lists.filter(filterDeleted);
      return { lists: newLists };
    }
    default:
      return state;
  }
};
