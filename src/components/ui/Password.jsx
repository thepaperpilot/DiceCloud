import React, {Component} from 'react'
import './field.css'

class Password extends Component {
    render() {
        return (
            <div className="field">
                <p className="field-title">{this.props.title}</p>
                <input
                    type="password"
                    value={this.props.value}
                    onChange={e => this.props.onChange(e.target.value)}
                    disabled={this.props.disabled} />
            </div>
        )
    }
}

export default Password
