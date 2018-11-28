import {constants} from "./constants";
import {combineReducers} from "redux";

export const initialState = {
    todo: [],
    selectedTodo: -1
};

export const todo = (state = [], action) => {
    switch(action.type){
    case constants.UPDATE_TODO:
        return action.payload;
    default:
        return state;
    }
};

export const selectedTodo = (state = -1, action) => {
    switch(action.type){
    case constants.SELECT_TODO:
        return action.payload;
    case constants.DESELECT_TODO:
        return -1;
    default:
        return state;
    }
};

export default combineReducers({
    todo,
    selectedTodo
});