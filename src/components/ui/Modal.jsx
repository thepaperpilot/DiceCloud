import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './modal.css'

const modalRoot = document.getElementById('modal-root')

class Modal extends Component {
	constructor(props) {
		super(props)

		this.el = document.createElement('div')
	}

	componentDidMount() {
		modalRoot.appendChild(this.el)
	}

	componentWillUnmount() {
		modalRoot.removeChild(this.el)
	}

	render() {
		return ReactDOM.createPortal(<div className={this.props.open ? 'modal open' : 'modal'}>
			<div className="modal-backdrop" onClick={this.props.cancel} />
			<div className="modal-content">
				<div className="modal-title">{this.props.title}</div>
				{this.props.children}
			</div>
		</div>, this.el)
	}
}

export default Modal
