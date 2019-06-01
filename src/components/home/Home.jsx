import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import { Fab, Action } from 'react-tiny-fab'
import { MdAdd, MdPersonAdd } from 'react-icons/md'
import { errorHandler } from './../../util'
import CharThumbnail from './CharThumbnail'
import CharacterModal from './CharacterModal'
import 'react-tiny-fab/dist/styles.min.css'
import './home.css'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            characters: []
        }

        this.newCharacter = this.newCharacter.bind(this)
    }

    componentWillMount() {
        axios.get('/api/character/list').then(response => {
            this.setState({
                characters: response.characters
            })
        }).catch(errorHandler)
    }

    newCharacter() {
        this.props.dispatch({
            type: 'OPEN_MODAL',
            modal: 'character'
        })
    }

    render() {
        const {user} = this.props

        if (!user) return null

        const {characters} = this.state

        return <div className="home">
            {characters && characters.map(character =>
                <CharThumbnail character={character} />)}
            <Fab icon={MdAdd()}>
                <Action text="New Character"
                    children={MdPersonAdd()}
                    onClick={this.newCharacter} />
            </Fab>
            <CharacterModal />
        </div>
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Home)
