import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducers";

const middlewares = [thunk];

export default createStore(reducer, applyMiddleware(...middlewares));
