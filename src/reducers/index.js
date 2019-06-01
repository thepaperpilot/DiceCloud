import characters from './characters/characters'
import modal from './modal/modal'
import user from './user/user'
import { combineReducers } from 'redux'

export default combineReducers({
    characters,
    modal,
    user
})
