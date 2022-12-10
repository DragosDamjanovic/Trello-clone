import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { WorkplaceByIdReducer } from "./Reducers/WorkplaceReducer";
import { ListByIdReducer } from "./Reducers/ListReducer";
import { CardByIdReducer } from "./Reducers/CardsReducer";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./Reducers/UserReducers";

const reducers = combineReducers({
  WorkplaceById: WorkplaceByIdReducer,
  ListById: ListByIdReducer,
  CardById: CardByIdReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetailsReducer: userDetailsReducer,
});

// WORKPLACE
// const workplaceInfoFromLocalStorage = localStorage.getItem("workplaceInfo")
//   ? JSON.parse(localStorage.getItem("workplaceInfo"))
//   : null;

// LISTS
const listsInfoFromLocalStorage = localStorage.getItem("listsInfo")
  ? JSON.parse(localStorage.getItem("listsInfo"))
  : null;

// CARDS
const cardsInfoFromLocalStorage = localStorage.getItem("cardsInfo")
  ? JSON.parse(localStorage.getItem("cardsInfo"))
  : null;

// LOGIN
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  Workplace: {
    // workplaceInfo: workplaceInfoFromLocalStorage,
    listsInfo: listsInfoFromLocalStorage,
    cardsInfo: cardsInfoFromLocalStorage,
  },
  userLogin: {
    userInfo: userInfoFromLocalStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
