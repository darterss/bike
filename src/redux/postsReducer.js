import {SET_CASES, SET_EMPLOYEES} from "./actionTypes";

const initialState = {
    employees: [],
    cases: []
};
export function postsReducer(state = initialState, action) {

    switch(action.type) {

        case SET_EMPLOYEES:
            return {...state, employees: action.data}

        case SET_CASES:
            return {...state, cases: action.data}

        default:
            return state;
    }
}
