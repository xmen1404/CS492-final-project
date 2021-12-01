import React from 'react';
// import './chat.scss';
import '../style/MLStats.css';

const SERVER = "http://127.0.0.1:8080";
export class MLStats extends React.Component {
    render() {
        return (
            <div className="MLStats-container">
                <div className="MLStats-header">
                    <div className="MLStats-header-text">Prediction Stats</div>   
                </div>
            </div>
        );
    }
}