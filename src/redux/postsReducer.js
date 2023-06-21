import {GET_EMPLOYEES} from "./actionTypes";

const initialState = {
    employees: []
};
export function postsReducer(state = initialState, action) {
    switch(action.type) {
        case GET_EMPLOYEES:
            return {...state, employees: action.data}
        default:
            return state;
    }
}
