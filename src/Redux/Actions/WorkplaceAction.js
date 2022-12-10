import { WORKPLACE_ADD_LIST } from "../Constants/WorkplaceConstants";

// ADD LIST BY WORKPLACE ID
export const addListByWorkplace = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${URL}/api/products/${id}`);

  dispatch({
    type: WORKPLACE_ADD_LIST,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
