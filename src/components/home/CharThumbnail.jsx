import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './char-thumb.css'

class CharThumbnail extends Component {
    render() {
        const {name, picture} = this.props.character

        return <div className="char-thumb">
            <div className="char-thumb-name">{name}</div>
            <img className="char-thumb-img" src={picture} />
        </div>
    }
}

export default CharThumbnail
