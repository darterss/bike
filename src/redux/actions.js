import {SET_EMPLOYEES, SET_AUTHORIZED, SET_CASES} from "./actionTypes";

export function setAuthorized(authorized) {
    return {
        type: SET_AUTHORIZED,
        login: authorized
    }
}

export function setEmployees (data) {
    return {
        type: SET_EMPLOYEES,
        data: data
    }
}
export function setCases (data) {
    return {
        type: SET_CASES,
        data: data
    }
}