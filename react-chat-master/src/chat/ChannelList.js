import React from 'react';
import { Channel } from './Channel';
import '../style/channelList.css';

export class ChannelList extends React.Component {

    handleClick = id => {
        this.props.onSelectChannel(id);
    }

    render() {

        let list = <div className="no-content-message">There is no channels to show</div>;
        if (this.props.channels && this.props.channels.map) {
            let chosenID = null
            if(this.props.chosenChannel) {
                chosenID = this.props.chosenChannel.id
            }

            list = this.props.channels.map(c => <Channel key={c.id} id={c.id} name={c.name} participants={c.participants} chosen={chosenID == c.id} onClick={this.handleClick} />);
        }
        return (
            <div className="channel-list-container">
                <div className="channel-list-header">
                    <div className="channel-list-header-text">Chat Channels</div>
                </div>
                <div className='channel-list'>
                    {list}
                </div>
            </div>
        );
    }

}