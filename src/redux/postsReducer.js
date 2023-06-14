import {ADD_EMPLOYEE} from "./actionTypes";

const initialState = {
    employees: [],
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0O…jc1fQ.umha6kaSymgoQ-cCK1JQL-4_tzX-62onHf4BVtHQr2M'
};
export function postsReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_EMPLOYEE:
            return {...state, employees: [...state.employees, action.payload]}
        default:
            return state;
    }
}
