import {ADD_EMPLOYEE, SET_AUTHORIZED} from "./actionTypes";
import axios from "axios";

export function setAuthorized(authorized) {
    return {
        type: SET_AUTHORIZED,
        login: authorized
    }
}

export const addEmployee = (newAccount) => {
    console.log(newAccount)
    return dispatch => {
        axios
            .post('https://sf-final-project-be.herokuapp.com/api/auth/sign_in', newAccount)
            .then(res => console.log(res.data.data))
    }
}
function addEmployeeToStore(newAccount) {
    return {
        type: ADD_EMPLOYEE,
        payload: newAccount
    }
}