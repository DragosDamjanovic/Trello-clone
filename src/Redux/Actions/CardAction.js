import { ADD_CARD_CID } from "../Constants/CardConstants";

// ADD LIST BY WORKPLACE ID
export const addCard = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`${URL}/api/products/${id}`);

  dispatch({
    type: ADD_CARD_CID,
    payload: {
      list: data._id,
      title: data.cardTitle,
    },
  });

  localStorage.setItem("listItems", JSON.stringify(getState().cart.cartItems));
};
