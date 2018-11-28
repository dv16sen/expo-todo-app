import {constants} from "./constants";

export const updateTodo = (todo) => ({
    type: constants.UPDATE_TODO,
    payload: Object.values(todo).reverse()
});

export const selectTodo = (todoIndex) => ({
    type: constants.SELECT_TODO,
    payload: todoIndex
});

export const deselectTodo = () => ({
    type: constants.DESELECT_TODO,
    payload: -1
});