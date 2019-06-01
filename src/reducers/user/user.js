import util from './../util'

export const DEFAULTS = null

function login(state, action) {
    return {
        username: action.username
    }
}

function logout() {
    return null
}

export default util.createReducer(DEFAULTS, {
    'LOGIN': login,
    'LOGOUT': logout
})
