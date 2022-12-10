import {
  ADD_CARD_LID,
  ADD_LIST_LID,
  CHANGE_LIST_TITLE_LID,
  DELETE_CARD_LID,
  DELETE_LIST_LID,
  MOVE_CARD_LID,
} from "../Constants/ListConstants";

// BY LISTS ID
export const ListByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_LIST_LID:
      const { listId, listTitle } = action.payload;
      return {
        ...state,
        [listId]: { _id: listId, title: listTitle, cards: [] },
      };
    case CHANGE_LIST_TITLE_LID:
      return {
        ...state,
        [listId]: { ...state[listId], title: listTitle },
      };
    case DELETE_LIST_LID:
      const { [listId]: deletedList, ...restOfLists } = state;
      return {
        list: restOfLists,
      };
    case ADD_CARD_LID:
      const { cardId } = action.payload;
      return {
        ...state,
        [listId]: { ...state[listId], cards: [...state[listId].cards, cardId] },
      };
    case MOVE_CARD_LID:
      const { oldCardIndex, newCardIndex, sourceListId, destListId } =
        action.payload;

      // Move within the same list
      if (sourceListId === destListId) {
        const newCards = Array.from(state[sourceListId].cards);
        const [removedCard] = newCards.splice(oldCardIndex, 1);
        newCards.splice(newCardIndex, 0, removedCard);
        return {
          ...state,
          [sourceListId]: { ...state[sourceListId], cards: newCards },
        };
      }

      // Move card from one list to another
      const sourceCards = Array.from(state[sourceListId].cards);
      const [removedCard] = sourceCards.splice(oldCardIndex, 1);
      const destinationCards = Array.from(state[destListId].cards);
      destinationCards.splice(newCardIndex, 0, removedCard);
      return {
        ...state,
        [sourceListId]: { ...state[sourceListId], cards: sourceCards },
        [destListId]: { ...state[destListId], cards: destinationCards },
      };
    case DELETE_CARD_LID:
      const { cardId: deletedCardId } = action.payload;
      const filterDeleted = (cardId) => cardId !== deletedCardId;
      return {
        ...state,
        [listId]: {
          ...state[listId],
          cards: state[listId].cards.filter(filterDeleted),
        },
      };
    default:
      return state;
  }
};
