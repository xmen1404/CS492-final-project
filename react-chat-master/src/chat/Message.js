import React from 'react';
import '../style/message.css';


export class Message extends React.Component {

    render() {
        return (
            <div className='message-item'>
                <div><b>{this.props.senderName}</b></div>
                <div className="message-container">
                    <span>{this.props.text}</span>
                </div>
            </div>
        )
    }
}