import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { WorkspaceReducer } from "./Reducers/WorkspaceReducer";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./Reducers/UserReducers";

const reducers = combineReducers({
  Workspace: WorkspaceReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetailsReducer: userDetailsReducer,
});

// WORKSPACE
const workspaceInfoFromLocalStorage = localStorage.getItem("workspaceInfo")
  ? JSON.parse(localStorage.getItem("workspaceInfo"))
  : null;

// LOGIN
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromLocalStorage,
    workspaceInfo: workspaceInfoFromLocalStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
