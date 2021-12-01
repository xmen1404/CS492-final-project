import React from 'react';
import { Message } from './Message';
import '../style/messagesPanel.css';
import sendIcon from '../assets/icons8-email-send-30.png'

export class MessagesPanel extends React.Component {
    state = { input_value: '' }
    send = () => {
        if (this.state.input_value && this.state.input_value != '') {
            this.props.onSendMessage(this.props.channel.id, this.state.input_value);
            this.setState({ input_value: '' });
        }
    }

    handleInput = e => {
        this.setState({ input_value: e.target.value });
        console.log("text changed");
        console.log(e.target.value)
    }

    render() {

        let list = <div className="no-content-message">There is no messages to show</div>;
        if (this.props.channel && this.props.channel.messages) {
            list = this.props.channel.messages.map(m => <Message key={m.id} id={m.id} senderName={m.senderName} text={m.text} />);
        }
        return (
            <div className="messagePanel-container">
                <div className='messages-panel'>
                    <div className="messages-panel-header">
                        {this.props.channel && 
                            <div className="mph-text">{this.props.channel.name}</div>
                        }
                        {!this.props.channel && 
                            <div className="mph-text"> Welcome! Please choose a channel on the left. Have fun! </div>
                        }
                    </div>
                    <div className="meesages-list">{list}</div>
                    {this.props.channel &&
                        <div className="messages-input-container">
                            <div className="messages-input">
                                <input type="text" 
                                    onChange={this.handleInput} 
                                    value={this.state.input_value}
                                    placeholder="Write your message..." 
                                />
                                <div className="emoji-prediction"></div>
                                <button onClick={this.send}>
                                    <img src={sendIcon}></img>
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }

}