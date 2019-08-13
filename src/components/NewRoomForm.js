import React, {Component} from 'react';

export default class NewRoomForm extends Component{
    constructor(){
        super();
        this.handleChang = this.handleChang.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state= {
            className:'',
        }

    }

    handleChang(e)
    {
        this.setState({
            className:e.target.value
        })
    }

    handleSubmit(e)
    {
        e.preventDefault()
        console.log(this.state.className)
        this.setState({
            className:"",
        })
        this.props.create_room(this.state.className)
    }








    render(){
       
        return(
            <div className="new-room-form">
            <form onSubmit = {this.handleSubmit}>
                <input
                onChange = {this.handleChang}
                value = {this.state.className}
                    type="text" 
                    placeholder="NewRoomForm" 
                    required />
                <button id="create-room-btn" type="submit">+</button>
        </form>
    </div>
        )
    }
}