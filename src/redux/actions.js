import {SET_EMPLOYEES, SET_AUTHORIZED, SET_CASES, SET_EMPLOYEE} from "./actionTypes";

export function setAuthorized(authorized) {
    
    return {
        type: SET_AUTHORIZED,
        login: authorized
    }
}
export function setEmployee (data) {
    return {
        type: SET_EMPLOYEE,
        data: data
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