import React from 'react';
import '../style/channel.css';

export class Channel extends React.Component {

    click = () => {
        this.props.onClick(this.props.id);
    }

    render() {
        let textC = "";
        let backgroundC = "";
        if(this.props.chosen) {
            textC = "#00A389";
            backgroundC = "#E0F4F1";
        }
        return (
            <div className='channel-item' style={{color: textC, backgroundColor:backgroundC}} onClick={this.click}>
                <div >{this.props.name}</div>
                <span>{this.props.participants}</span>
            </div>
        )
    }
}