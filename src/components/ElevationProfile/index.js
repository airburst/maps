import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import InfoPanel from './InfoPanel';
import Chart from './Chart';
import './ElevationProfile.css';

export default class ElevationProfile extends Component {

    render() {
        const wrapperClass = 'elevation-wrapper' + (this.props.show ? ' show' : '');

        return (
            <div className={wrapperClass}>
                <Paper
                    className="elevation-container"
                    zDepth={3}>
                    <InfoPanel 
                        show={this.props.show}
                        toggle={this.props.toggleElevation} />
                    <Chart data={this.props.elevation} />
                </Paper>
            </div>
        );
    }

}
