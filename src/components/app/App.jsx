import React, { Component } from 'react'
import {connect} from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Header from './../header/Header'
import Home from './../home/Home'
//import Character from './../character/Character'
import Modal from './../ui/Modal'
import { errorHandler } from './../../util'
import './app.css'

const HEADER_HEIGHT = 70

class App extends Component {
    constructor(props) {
    	super(props)

        this.logout = this.logout.bind(this)
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
    }

    componentDidMount() {
        axios.post('/auth/user').then(response => {
        	if (response.data.user) {
        		this.props.dispatch({
        			type: 'LOGIN',
        			...response.data.user
        		})
        	}
        })
    }

    logout() {
        axios.get('/logout').then(response => {
            if (response.status === 200) {
                this.props.dispatch({
                	type: 'LOGOUT'
                })
            }
        }).catch(errorHandler)
    }

    login(email, password) {
        axios.post('/login', {
            email,
            password
        }).then(response => {
            if (response.status === 200) {
                this.props.dispatch({
        			type: 'LOGIN',
        			...response.data.user
        		})
            }
        }).catch(errorHandler)
    }

    signup(username, email, password, confirmPassword) {
        axios.post('/signup', {
            username,
            email,
            password,
            confirmPassword
        }).then(response => {
            if (response.status === 200) {
                this.props.dispatch({
        			type: 'LOGIN',
        			...response.data.user
        		})
            }
        }).catch(errorHandler)
    }

    render() {
        return <BrowserRouter>
            <div style={{paddingTop: `${HEADER_HEIGHT}px`}} >
                <Header height={HEADER_HEIGHT}
                    login={this.login} signup={this.signup} logout={this.logout} />
                <div className="content">
                    <Switch>
                        <Route path="/character/:id" component={Header} />
                        <Route component={Home} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    }
}

export default connect()(App)
