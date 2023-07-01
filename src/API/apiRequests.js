import axios from "axios";
const headerFromLS = JSON.parse(localStorage.getItem('Auth'))
axios.defaults.baseURL = 'https://sf-final-project-be.herokuapp.com/api/'

export function getAllOfficers (setEmployees) {
    axios
        .get('officers/', headerFromLS)
        .then(res => setEmployees(res.data.officers))         //////////////////   записываю данные с сервера в state
        .catch(err => alert(err.response.data.message))
}
export function getOfficer (id) {
    axios
        .get(`officers/${id}`, headerFromLS)
        .then(res => res.data.data)
        .catch(err => alert(err.response.data.message))
}
export function deleteOfficer (id, getEmployees) {
    axios
        .delete(`officers/${id}`, headerFromLS)
        .then(res => {
            if (res.status === 200) {
                getAllOfficers(getEmployees)
            }
        })
        .catch(err => alert(err.response.data.message))
}

export function deleteCase (id, setCases) {
    axios
        .delete(`cases/${id}`, headerFromLS)
        .then(res => {
            if (res.status === 200) {
                getAllCases (setCases)
            }
        })
        .catch(err => alert(err.response.data.message))
}
export function signIn (setAuthorized, user) {
    axios
        .post('auth/sign_in', user)
        .then(res => {
            setAuthorized(true)
            localStorage.setItem('Auth', `{ "headers": { "Authorization": "Bearer ${res.data.data.token}"}}`)
        })
        .catch(err => alert(err.response.data.message))
}
export function tokenValidity () {
    axios
        .get('auth/', headerFromLS)
        .then(res => res.data.status === 'OK')
        .catch(err => {
            alert(err.response.data.message)
        })
}
export function changeOfficerData (id, user, navigate) {
    axios
        .put(`officers/${id}`, user, headerFromLS)
        .then(res => {
            if (res.status === 200) navigate(-1)
        })
        .catch(err => alert(err.response.data.message))
}
export function changeCaseData (id, editedCase, navigate) {
    axios
        .put(`cases/${id}`, editedCase, headerFromLS)
        .then(res => {
            if (res.status === 200) navigate(-1)
        })
        .catch(err => alert(err.response.data.message))
}
export function signUp (newEmployee, navigate) {
    axios
        .post('auth/sign_up', newEmployee)
        .then(res => {
            if (res.status === 200) navigate(-1)
        })
        .catch(err => alert(err.response.data.message))
}

export function createCase (theft, navigate) {                 //      add catch//////////////////////////////////////////////
    if (localStorage.getItem('Auth')) {
        axios
            .post('cases/', theft, headerFromLS)
            .then(res => {
                if (res.status === 200) navigate(-1)
            })
            .catch(err => alert(err.response.data.message))
    }
    else {
        axios
            .post('public/report', theft)
            .then(res => {
                if (res.status === 200) navigate(-1)
            })
            .catch(err => alert(err.response.data.message))
    }
}
export function getAllCases (setCases) {
    axios
        .get('cases/', headerFromLS)
        .then(res => setCases(res.data.data))         //////////////////   записываю данные с сервера в state
        .catch(err => alert(err.response.data.message))
}