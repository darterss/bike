import axios from "axios";
import auth from "../services/auth";

axios.defaults.baseURL = 'https://sf-final-project-be.herokuapp.com/api/'
const $axios = axios.create()

$axios.interceptors.request.use(config => {
    Object.assign(config, {'headers': auth.getAuthHeaders()})
    return config
}, error => Promise.reject(error)
)

export function getAllOfficers () {
    return $axios
        .get('officers/')
        .then(res => res.data.officers)
        .catch(err => {
            alert(err.response.data.message)
        })
}

export function getOfficer (id, setEmployee) {
    $axios
        .get(`officers/${id}`)
        .then(res => setEmployee(res.data.data))
        .catch(err => alert(err.response.data.message))
}

export function deleteOfficer (id, getEmployees) {
    $axios
        .delete(`officers/${id}`)
        .then(res => {
            if (res.status === 200) {
                getAllOfficers().then(getEmployees)
            }
        })
        .catch(err => alert(err.response.data.message))
}

export function deleteCase (id, setCases) {
    $axios
        .delete(`cases/${id}`)
        .then(res => {
            if (res.status === 200) {
                getAllCases().then(setCases)
            }
        })
        .catch(err => alert(err.response.data.message))
}

export function getCase (id) {
    return $axios
        .get(`cases/${id}`)
        .then(res => res.data.data)
        .catch(err => alert(err.response.data.message))
}

export function signIn (setAuthorized, user) {
    axios
        .post('auth/sign_in', user)
        .then(res => {
            if (res) {
                setAuthorized(true)
                auth.setToken(res.data.data.token)
            } else alert('Необходимо пройти авторизацию заново')
        })
        .catch(err => alert(err.response.data.message))
}

export function changeOfficerData (id, user, navigate) {
    $axios
        .put(`officers/${id}`, user)
        .then(res => {
            if (res.status === 200) navigate(-1)
        })
        .catch(err => alert(err.response.data.message))
}

export function changeCaseData (id, editedCase, navigate) {
    $axios
        .put(`cases/${id}`, editedCase)
        .then(res => {
            if (res.status === 200) navigate(-1)
        })
        .catch(err => alert(err.response.data.message))
}

export function signUp (newEmployee, navigate) {
    $axios
        .post('auth/sign_up', newEmployee)
        .then(res => {
            if (res.status === 200) navigate(-1)
        })
        .catch(err => alert(err.response.data.message))
}

export function createCase (theft, navigate) {
    if (auth.hasToken()) {
        $axios
            .post('cases/', theft)
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

export function getAllCases () {
    return $axios
        .get('cases/')
        .then(res => res.data.data)
        .catch(err => alert(err.response.data.message))
}