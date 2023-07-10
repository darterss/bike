import {SET_AUTHORIZED} from "./actionTypes";
import auth from "../services/auth";

const initialState = {
    authorized: auth.hasToken()
}

export function appReducer(state = initialState, action) {

    switch (action.type) {

        case SET_AUTHORIZED:
            return {...state, authorized: action.login}

        default:
            return state;
    }
}