import util from './../util'

export const DEFAULTS = {
    open: false,
    modal: '',
    data: null
}

function openModal(state, action) {
    return {
        open: true,
        modal: action.modal,
        data: action.data
    }
}

function closeModal(state) {
    return util.updateObject(state, {
        open: false
    })
}

export default util.createReducer(DEFAULTS, {
    'OPEN_MODAL': openModal,
    'CLOSE_MODAL': closeModal
})
