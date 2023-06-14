import {SET_AUTHORIZED} from "./actionTypes";

const initialState = { authorized: false };
export function appReducer(state = initialState, action) {
    switch(action.type) {
        case SET_AUTHORIZED:
            return { authorized: action.login }
        default:
            return state;
    }
}