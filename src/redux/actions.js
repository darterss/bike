import {GET_EMPLOYEES, SET_AUTHORIZED} from "./actionTypes";

export function setAuthorized(authorized) {
    return {
        type: SET_AUTHORIZED,
        login: authorized
    }
}
export function getEmployees (data) {
    return {
        type: GET_EMPLOYEES,
        data: data
    }
}