import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link, Route } from 'react-router-dom'
import Modal from '../ui/Modal'
import Text from '../ui/Text'
import Password from '../ui/Password'
import './header.css'

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modal: null,
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        }

        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
        this.open = this.open.bind(this)
        this.cancel = this.cancel.bind(this)
        this.change = this.change.bind(this)
    }

    login(e) {
        e.preventDefault()
        this.props.login(this.state.email, this.state.password)
        this.cancel()
    }

    signup(e) {
        e.preventDefault()
        this.props.signup(this.state.username, this.state.email, this.state.password, this.state.passwordConfirmation)
        this.cancel()
    }

    open(modal) {
        return () => {
            this.setState({
                modal
            })
        }
    }

    cancel() {
        this.setState({
            modal: null
        })
    }

    change(field) {
        return value => this.setState({
                [field]: value
            })
    }

    render() {
        return <div
            className="header"
            style={{
                height: `${this.props.height}px`
            }}>
            <div className="header-title">
                <Link to="/" style={{ lineHeight: `${this.props.height}px` }}>Dice Cloud</Link>
                {this.props.username ?
                    <div className="userStatus">
                        <p>Logged in as {this.props.username}</p>
                        <button onClick={this.props.logout}>Log Out</button>
                    </div> :
                    <div className="userStatus">
                        <button onClick={this.open('login')}>Log In</button>
                        <button onClick={this.open('signup')}>Sign Up</button>
                    </div>}
            </div>
            <div className="nav">
            </div>
            <Modal open={this.state.modal === 'login'} title="Log In" cancel={this.cancel}>
                <form onSubmit={this.login}>
                    <Text title="Email" value={this.state.email} onChange={this.change('email')} />
                    <Password title="Password" value={this.state.password} onChange={this.change('password')} />
                    <button onClick={this.login}>Log In</button>
                </form>
            </Modal>
            <Modal open={this.state.modal === 'signup'} title="Sign Up" cancel={this.cancel}>
                <form onSubmit={this.signup}>
                    <Text title="Username" value={this.state.username} onChange={this.change('username')} />
                    <Text title="Email" value={this.state.email} onChange={this.change('email')} />
                    <Password title="Password" value={this.state.password} onChange={this.change('password')} />
                    <Password title="Confirm Password" value={this.state.passwordConfirmation} onChange={this.change('passwordConfirmation')} />
                    <button onClick={this.signup}>Sign Up</button>
                </form>
            </Modal>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        username: state.user && state.user.username
    }
}

export default connect(mapStateToProps)(Header)
