import {SET_AUTHORIZED} from "./actionTypes";

const initialState = {
    authorized: !!JSON.parse(localStorage.getItem('Auth'))
    }

export function appReducer(state = initialState, action) {
    switch(action.type) {
        case SET_AUTHORIZED:
            return { ...state, authorized: action.login }
        default:
            return state;
    }
}