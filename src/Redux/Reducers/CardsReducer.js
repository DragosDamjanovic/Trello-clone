import {
  ADD_CARD_CID,
  CHANGE_CARD_TEXT_CID,
  CHANGE_CARD_TITLE_CID,
  DELETE_CARD_CID,
  DELETE_LIST_CID,
} from "../Constants/CardConstants";

// BY CARD ID
export const CardByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CARD_CID:
      const { cardText, cardTitle, cardId } = action.payload;
      return {
        ...state,
        [cardId]: { text: cardText, title: cardTitle, _id: cardId },
      };
    case CHANGE_CARD_TITLE_CID:
      return {
        ...state,
        [cardId]: { ...state[cardId], cardTitle },
      };
    case CHANGE_CARD_TEXT_CID:
      return {
        ...state,
        [cardId]: { ...state[cardId], text: cardText },
      };
    case DELETE_CARD_CID:
      const { [cardId]: deletedCard, ...restOfCards } = state;
      return {
        cards: restOfCards,
      };
    case DELETE_LIST_CID:
      const { cards: cardIds } = action.payload;
      return Object.keys(state)
        .filter((cardId) => !cardIds.includes(cardId))
        .reduce(
          (newState, cardId) => ({ ...newState, [cardId]: state[cardId] }),
          {}
        );
    default:
      return state;
  }
};
