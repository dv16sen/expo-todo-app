import {constants} from "./constants";

export const updateTodo = (todo) => ({
    type: constants.UPDATE_TODO,
    payload: Object.keys(todo).map(key => ({
        key,
        value: todo[key]
    })).reverse()
});

export const selectTodo = (todoIndex) => ({
    type: constants.SELECT_TODO,
    payload: todoIndex
});

export const deselectTodo = () => ({
    type: constants.DESELECT_TODO
});

export const startFirebaseCommunication = () => ({
    type: constants.START_FIREBASE_COMMUNICATION
});

export const stopFirebaseCommunication = () => ({
    type: constants.STOP_FIREBASE_COMMUNICATION
});