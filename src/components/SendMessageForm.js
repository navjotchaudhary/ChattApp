import React, {Component} from 'react';

export default class SendMessageForm extends Component{
    constructor(){
        
        super();
        this.state={
            message:""

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e){
        this.setState({
            message:e.target.value
        })
        console.log(e.target.value)
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.sendMessage(this.state.message)
        this.setState({
            message:""
        })
    }

    render(){
        return(
            <form className="send-message-form" onSubmit={this.handleSubmit}>
                <input
                onChange={this.handleChange}
                placeholder="type your message here and press enter"
                value={this.state.message}
                type="text" />
            </form>
            
            )
    }
}