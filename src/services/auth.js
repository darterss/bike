class Auth {

    token = null
    userName = null

    setToken = (token) => {
        localStorage.setItem('Auth', token)
        this.token = token
    }

    getToken = () => {
        if (!this.token) {
            this.token = localStorage.getItem('Auth')
        }
        return this.token
    }

    hasToken = () => {
        if (!this.token) {
            this.token = localStorage.getItem('Auth')
        }
        return !!this.token
    }

    setUserName = (userName) => {
        this.userName = userName
        localStorage.setItem('userName', userName)
    }

    getAuthHeaders = () => {
        return {Authorization: `Bearer ${this.getToken()}`}
    }

    getUserName = () => {
        if (!this.userName) {
            this.userName = localStorage.getItem('userName')
        }
        return this.userName
    }

    logout = () => {
        localStorage.removeItem('Auth')
        localStorage.removeItem('userName')
        this.userName = null
        this.token = null
    }
}

const auth = new Auth()

export default auth