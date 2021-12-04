import React from 'react';
import { ChannelList } from './ChannelList';
import { MLStats } from './MLStats';
// import './chat.scss';
import '../style/chat.css';
import sendIcon from '../assets/icons8-email-send-30.png'
import { MessagesPanel } from './MessagesPanel';
import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:8080";

export class Chat extends React.Component {

    state = {
        channels: null,
        socket: null,
        channel: null, 
        userName: null, 
        tempUserName: null, 
    }
    socket;
    componentDidMount() {
        this.loadChannels();
        this.configureSocket();
    }

    configureSocket = () => {
        var socket = socketClient(SERVER);
        socket.on('connection', () => {
            if (this.state.channel) {
                this.handleChannelSelect(this.state.channel.id);
            }
        });
        socket.on('channel', channel => {
            
            let channels = this.state.channels;
            channels.forEach(c => {
                if (c.id === channel.id) {
                    c.participants = channel.participants;
                }
            });
            this.setState({ channels });
        });
        socket.on('message', message => {
            
            let channels = this.state.channels
            channels.forEach(c => {
                if (c.id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
            });
            this.setState({ channels });
        });
        this.socket = socket;
    }

    loadChannels = async () => {
        fetch('http://localhost:8080/getChannels').then(async response => {
            let data = await response.json();
            this.setState({ channels: data.channels });
        })
    }

    handleChannelSelect = id => {
        let channel = this.state.channels.find(c => {
            return c.id === id;
        });
        this.setState({ channel });
        this.socket.emit('channel-join', id, ack => {
        });
    }

    handleSendMessage = (channel_id, text) => {
        this.socket.emit('send-message', { channel_id, text, senderName: this.state.userName, id: Date.now() });
    }

    handleNameSubmit = (event) => {
        // console.log(this.state.tempUserName);
        this.setState({userName: this.state.tempUserName});
    }

    handleOnChange = (event) => {
        this.setState({tempUserName: event.target.value})
    }


    render() {

        return (
            <div className="chat-app-container">
                {!this.state.userName && 
                    <div className="chat-login-container">
                        <div className="chat-welcome">
                            Welcome to Our Testing Site!
                        </div>
                        <div className="chat-login-direction">
                            Login
                        </div>
                        <form className="chat-nameInput" onSubmit={this.handleNameSubmit}>
                            <div className="login-input">
                                <input type="login-text" 
                                    onChange={this.handleOnChange} 
                                    // value={this.state.input_value}
                                    placeholder="Type your user name here..." 
                                />
                                <button type="submit">
                                    <img src={sendIcon}></img>
                                </button>
                            </div>
                        </form>
                    </div>
                }
                {this.state.userName &&
                    <div className='chat-app'>
                        <ChannelList 
                            channels={this.state.channels} 
                            onSelectChannel={this.handleChannelSelect} 
                            chosenChannel={this.state.channel}
                        />
                        <MessagesPanel 
                            onSendMessage={this.handleSendMessage} 
                            channel={this.state.channel} 
                        />
                        <MLStats/>
                    </div>
                }
            </div>
            
        );
    }
}