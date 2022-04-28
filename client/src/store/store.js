import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReducerReducer from '../reducer/reducer'
import thunk from "redux-thunk";

export const store = createStore(
    ReducerReducer,
    composeWithDevTools(applyMiddleware(thunk))
);