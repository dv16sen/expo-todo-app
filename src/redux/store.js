import reducers from "./reducers";
import {initialState} from "./reducers";
import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";

export const initStore = (state = initialState) => {
    return createStore(
        reducers,
        state,
        applyMiddleware(thunkMiddleware)
    );
};