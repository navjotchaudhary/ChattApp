import React from 'react';

function Message(props) {
        var messageClass = "message"
        if(props.user===props.username){
            messageClass += " message-sameuser"
        }
        return(
            <div className={messageClass} >
                <div className="message-username">{props.username}</div>
                <div className="message-text">{props.text}</div>
            </div>
        )
    }


export default Message