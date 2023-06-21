import axios from "axios";
const headerFromLS = JSON.parse(localStorage.getItem('Auth'))

export function getAllOfficers (getEmployees) {
    axios
        .get(`https://sf-final-project-be.herokuapp.com/api/officers/`, headerFromLS)
        .then(res => getEmployees(res.data.officers))         //////////////////   записываю данные с сервера в state
        .catch(err => alert(err.response.data.message))
}
export function deleteOfficer (id, getEmployees) {
    axios
        .delete(`https://sf-final-project-be.herokuapp.com/api/officers/${id}`, headerFromLS)
        .then(res => {
            if (res.status === 200) {
                getAllOfficers(getEmployees)
            }
        })
        .catch(err => alert(err.response.data.message))
}
export function signIn (setAuthorized, user) {
    axios
        .post('https://sf-final-project-be.herokuapp.com/api/auth/sign_in', user)
        .then(res => {
            setAuthorized(true)
            localStorage.setItem('Auth', `{ "headers": { "Authorization": "Bearer ${res.data.data.token}"}}`)
        })
        .catch(err => alert(err.response.data.message))
}
export function changeOfficerData (id, user, navigate) {
    axios
        .put(`https://sf-final-project-be.herokuapp.com/api/officers/${id}`, user, headerFromLS)
        .then(res => {
            if (res.status === 200) navigate(-1)
        })
        .catch(err => alert(err.response.data.message))
}
export function signUp (newEmployee, navigate) {
    axios
        .post('https://sf-final-project-be.herokuapp.com/api/auth/sign_up', newEmployee)
        .then(res => {
            if (res.status === 200) navigate(-1)
        })
        .catch(err => alert(err.response.data.message))
}