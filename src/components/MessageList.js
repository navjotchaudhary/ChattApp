import React, {Component} from 'react';
import Message from './Message'
import ReactDOM from 'react-dom';

 class MessageList extends Component{


    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight +500 >= node.scrollHeight
    }


    componentDidUpdate() {
        if(this.shouldScrollToBottom){
        const node = ReactDOM.findDOMNode(this)
        node.scrollTop = node.scrollHeight
        }
    }
    


    render(props){
        console.log(this.props.messages)
        return(
            <div className='message-list' >  
                                                                 
                {this.props.messages.map((message) => {
                    return(
                        
                        <Message key={message.id} user={this.props.user} username={message.senderId} text={message.parts[0].payload.content}/>
                        
                    )
                })}
            
            </div>
        )
    }
}
export default MessageList;