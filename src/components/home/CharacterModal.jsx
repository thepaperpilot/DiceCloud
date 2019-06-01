import React, { Component } from 'react'
import {connect} from 'react-redux'
import Modal from './../ui/Modal'
import Text from './../ui/Text'

class CharacterModal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			gender: '',
			alignment: ''
		}

		this.cancel = this.cancel.bind(this)
		this.saveCharacter = this.saveCharacter.bind(this)
		this.change = this.change.bind(this)
	}

	cancel() {
		this.props.dispatch({ type: 'CLOSE_MODAL' })
	}

	saveCharacter() {

	}

    change(field) {
        return value => this.setState({
                [field]: value
            })
    }

    render() {
        return <Modal open={this.props.modal === 'character'} title={this.props.data ? 'Edit Character' : 'New Character'} cancel={this.cancel}>
            <form onSubmit={this.saveCharacter}>
                <Text title="Email" value={this.state.email} onChange={this.change('email')} />
                <button onClick={this.saveCharacter}>Create</button>
            </form>
        </Modal>
    }
}

function mapStateToProps(state) {
	return {
		modal: state.modal.open && state.modal.modal,
		data: state.modal.data
	}
}

export default connect(mapStateToProps)(CharacterModal)
