import React from 'react';
import IconButton from 'material-ui/IconButton';
import UpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import DownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import './ElevationProfile.css';

const ShowLink = props => {
    return (
        <div className="right" onClick={props.action}>
            <div className="toggle">Show Elevation</div>
            <IconButton><UpIcon /></IconButton>
        </div>
    );
}

const HideLink = props => {
    return (
        <div className="right" onClick={props.action}>
            <div className="toggle">Hide Elevation</div>
            <IconButton><DownIcon /></IconButton>
        </div>
    );
}

const InfoPanel = props => {
    return (
        <div className="infopanel">
            <div className="left">
                <div className="info-item">
                    <div className="value">{props.distance} km</div>
                    <div className="label">Distance</div>
                </div>
                <div className="info-item">
                    <div className="value">{props.ascent} m</div>
                    <div className="label">Height Gain</div>
                </div>
            </div>
            {
                props.show ?
                    <HideLink action={props.toggle} /> :
                    <ShowLink action={props.toggle} />
            }
        </div>
    );
}

export default InfoPanel;
