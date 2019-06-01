import util from './../util'

export const DEFAULTS = {
    name: '',
    picture: '',
    persona: {
        race: '',
        alignment: '',
        gender: '',
        description: '',
        personality: '',
        ideals: '',
        bonds: '',
        flaws: '',
        background: ''
    }
}

function load(state, action) {
    return action.character
}

export default util.createReducer(DEFAULTS, {
    'LOAD': load
})
